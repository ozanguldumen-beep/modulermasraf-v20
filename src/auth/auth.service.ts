import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where:{ email:email.toLowerCase() } });
    if (!user || !user.isActive) return null;
    if (!(await bcrypt.compare(password, user.passwordHash))) return null;
    return user;
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where:{ id } });
  }
}
