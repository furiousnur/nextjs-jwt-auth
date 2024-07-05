import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/User';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LeaveBalance } from '../../../typeorm/entities/LeaveBalance';

@Injectable()
export class LeaveBalanceService {
    constructor(
        @InjectRepository(LeaveBalance)
        private readonly leaveBalanceRepository: Repository<LeaveBalance>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
    async handleCron() {
        console.log('Running cron job on the 1st day of every month at midnight');
        try {
            const users = await this.userRepository.find({ relations: ['leaveBalances'] });
            for (const user of users) {
                let leaveBalance = user.leaveBalances.find(lb => lb.createdAt.getMonth() === new Date().getMonth());
                if (!leaveBalance) {
                    leaveBalance = this.leaveBalanceRepository.create({
                        before: 0,
                        after: 1.5,
                        log: `Initial 1.5 leave balance on the 1st of the month`,
                        totalBalance: 1.5,
                        user: user,
                        createdAt: new Date(),
                    });
                } else {
                    leaveBalance.before = leaveBalance.after;
                    leaveBalance.after = +leaveBalance.after + 1.5; // Ensure numeric addition
                    leaveBalance.after = parseFloat(leaveBalance.after.toFixed(2)); // Ensure precision
                    leaveBalance.log = `Added 1.5 leave balance on the 1st of the month`;
                    leaveBalance.totalBalance = leaveBalance.after;
                    leaveBalance.updatedAt = new Date();
                }
                await this.leaveBalanceRepository.save(leaveBalance);
            }
            console.log('Leave balances updated for all users');
        } catch (e) {
            console.error('Error updating leave balances:', e.message);
            throw new BadRequestException(e.message);
        }
    }
}
