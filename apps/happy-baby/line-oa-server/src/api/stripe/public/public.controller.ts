import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import Stripe from 'stripe'

import { StripePublicService } from './public.service'

@Controller('/api/stripe/public')
export class StripePublicController {
  private readonly stripe: Stripe

  constructor(private readonly service: StripePublicService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
  }

  @Post('/webhook')
  async handleStripeWebhook(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    const event = req.body as Stripe.Event

    switch (event.data.object.object) {
      case 'checkout.session':
        // eslint-disable-next-line no-case-declarations
        const session = event.data.object as Stripe.Checkout.Session
        await this.service.handleCheckoutComplete(session)
        break
      default:
        throw new HttpException('Invalid event type', HttpStatus.BAD_REQUEST)
    }

    res.status(200).send('Received')
  }
}
