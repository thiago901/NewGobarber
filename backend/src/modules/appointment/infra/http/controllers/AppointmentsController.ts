import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmetsService from '@modules/appointment/services/CreateAppointmetsService';

export default class AppointmetsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointmetsService = container.resolve(
      CreateAppointmetsService,
    );
    const appointment = await createAppointmetsService.execute({
      date: parseDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
