import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerWithPoints } from '../types/customer';
import { Customer } from '../entity/customer.entity';
import { Claim } from '../entity/claim.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
  ) { }

  async createCustomer(email: string, name: string): Promise<Customer> {
    try {
      if (!email || !name) {
        throw new Error('Email and name must be provided');
      }

      const customer = this.customerRepository.create({ email, name });

      return this.customerRepository.save(customer);
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  async getCustomer(id: string): Promise<CustomerWithPoints | { id: string, totalPoints: 0 }> {
    try {
      const [customer, totalPoints] = await Promise.all([
        this.customerRepository.findOne({
          where: { id },
        }),
        this.claimRepository.createQueryBuilder('claim')
          .select('SUM(claim.pointValue)', 'totalPoints')
          .where('claim.customerId = :customerId', { customerId: id })
          .getRawOne()
      ]);

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      return { id: customer.id, totalPoints: totalPoints.totalPoints || 0 };
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw new Error('Failed to fetch customer');
    }
  }
}