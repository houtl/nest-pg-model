import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim } from '../entity/claim.entity';
import { ClaimEntity } from '../types/claim';
import { UUID } from 'crypto';

@Injectable()
export class ClaimService {
    constructor(
        @InjectRepository(Claim)
        private claimRepository: Repository<Claim>,
    ) { }

    async createClaims(claims: ClaimEntity[]): Promise<Claim[]> {
        try {
            const claim = this.claimRepository.create(claims);
            return this.claimRepository.save(claim);
        } catch (error) {
            console.error('Error creating claims:', error);
            throw new Error('Failed to create claims')
        }
    }

    async getClaimById(id: string): Promise<Claim> {
        try {
            const claim = await this.claimRepository.findOne({
                where: { id },
            });

            if (!claim) {
                throw new Error('Claim not found');
            }

            return claim;

        } catch (error) {
            console.error('Error fetching claim:', error);
            throw new Error('Failed to fetch claim');
        }
    }

    async getClaimsByCustomerId(customerId: string, offset?: number, limit?: number): Promise<Claim[]> {
        try {
            if (!Number.isInteger(offset) || offset < 0 || !Number.isInteger(limit) || limit <= 0) {
                throw new Error('Invalid offset or limit');
            }

            const claims = await this.claimRepository.find({
                where: { customerId },
                skip: offset,
                take: limit,
            });

            return claims || [];
        } catch (error) {
            console.error('Error fetching claims:', error);
            throw new Error('Failed to fetch claims');
        }
    }
}
