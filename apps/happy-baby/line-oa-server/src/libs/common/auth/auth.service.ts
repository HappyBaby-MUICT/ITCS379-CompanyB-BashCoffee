import { Injectable } from '@nestjs/common'
import { hash as argon2Hash, argon2id } from 'argon2'
import { createSigner, createVerifier } from 'fast-jwt'

type TokenPayload = {
  id: string
  iss: string
  sub: string
  iat: number
  exp: number
}

@Injectable()
export class AuthService {
  generateToken(id: string) {
    const signSync = createSigner({
      key: process.env.ENTROPY,
      expiresIn: 604800000,
    })

    return signSync({ id })
  }

  verifyToken(token: string): TokenPayload {
    const verifySync = createVerifier({
      key: process.env.ENTROPY,
      cache: true,
    })

    return verifySync(token)
  }

  async hashPassword(input: string) {
    const hash = await argon2Hash(input, {
      version: 19,
      type: argon2id,
      hashLength: 64,
      timeCost: 12,
      parallelism: 8,
      memoryCost: 2 ** 16,
      raw: true,
      salt: Buffer.from(process.env.ENTROPY!, 'utf-8'),
    }).then(hash => hash.toString('hex'))

    return hash
  }

  async verifyPassword(input: string, storedHash: string) {
    const inputHash = await this.hashPassword(input)

    return inputHash === storedHash
  }
}
