// customer.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from '../entity/customer.entity';
import { Claim } from '../entity/claim.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Claim])],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [TypeOrmModule],
})
export class CustomerModule { }
