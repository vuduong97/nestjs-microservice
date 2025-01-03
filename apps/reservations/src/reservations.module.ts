import { DatabaseModule } from '@libs/common';
import { Module, Provider } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import {
  RESERVATIONS_REPOSITORY,
  RESERVATIONS_SERVICE,
} from './reservations.di-tokens';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';

const dependencies: Provider[] = [
  {
    provide: RESERVATIONS_SERVICE,
    useClass: ReservationsService,
  },
  {
    provide: RESERVATIONS_REPOSITORY,
    useClass: ReservationsRepository,
  },
];

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ReservationDocument.name,
        schema: ReservationSchema,
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [...dependencies],
})
export class ReservationsModule {}
