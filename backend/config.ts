/**
 * configuration
 */
class Config {
  port: number;
  logLevel: string;

  constructor() {
    this.port =  3000;
    this.logLevel =  process.env.NODE_ENV === 'dev' ? 'debug' : 'info';
  }
}

export default new Config(); 
