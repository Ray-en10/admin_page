export interface Echange {
  codeEchange?: number;
  client?: { code: string };
  responsable?: { codeResponsable: string };
  createdAt?: Date;
  montant: number;
  state: string;
  livrer: boolean;
}
