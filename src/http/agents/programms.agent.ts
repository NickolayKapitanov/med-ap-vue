import Api from '../api';
import { Programm } from '../../models/programms.model';

class ProgrammsAgent extends Api {
  constructor() {
    super('https://run.mocky.io/v3');
  }

  async getProgramms(): Promise<Programm[]> {
    const response = await this.http.get('/a684655f-cf5a-4ad2-a33e-ec973897018d');

    return response.data?.programms;
  }
}

export default new ProgrammsAgent();