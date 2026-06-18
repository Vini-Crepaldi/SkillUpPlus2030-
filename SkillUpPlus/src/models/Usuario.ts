import { Entidade } from './Entidade';
export type AreaInteresse = 'IA' | 'Gestão' | 'Sustentabilidade' | 'Soft Skills';
export class Usuario extends Entidade {
  constructor(
    public nome: string,
    public email: string,
    private _senha: string,
    public area: AreaInteresse = 'IA',
    id?: string,
  ) {
    super(id ?? email);
  }
  validarSenha(tentativa: string): boolean {
    return this._senha === tentativa;
  }
  static senhaForte(senha: string): boolean {
    return senha.trim().length >= 6;
  }
  comArea(area: AreaInteresse): Usuario {
    return new Usuario(this.nome, this.email, this._senha, area, this._id);
  }
  toJSON(): Record<string, any> {
    return {
      id: this._id,
      nome: this.nome,
      email: this.email,
      senha: this._senha,
      area: this.area,
    };
  }
  static fromJSON(obj: any): Usuario {
    return new Usuario(obj.nome, obj.email, obj.senha, obj.area, obj.id);
  }
}
