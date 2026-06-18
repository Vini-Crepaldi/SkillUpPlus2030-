import { Entidade } from './Entidade';
import { AreaInteresse } from './Usuario';
export type Nivel = 'Iniciante' | 'Intermediário' | 'Avançado';
export class Curso extends Entidade {
  constructor(
    id: string,
    public titulo: string,
    public area: AreaInteresse,
    public cargaHoraria: number,
    public descricao: string,
    public nivel: Nivel,
    public imagem: string,
    public concluido: boolean = false,
  ) {
    super(id);
  }
  resumo(): string {
    return `${this.cargaHoraria}h • ${this.nivel}`;
  }
  toJSON(): Record<string, any> {
    return {
      id: this._id,
      titulo: this.titulo,
      area: this.area,
      cargaHoraria: this.cargaHoraria,
      descricao: this.descricao,
      nivel: this.nivel,
      imagem: this.imagem,
      concluido: this.concluido,
    };
  }
}
