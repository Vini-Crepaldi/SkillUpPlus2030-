import { Entidade } from './Entidade';
import { Curso } from './Curso';
import { AreaInteresse } from './Usuario';
export class Trilha extends Entidade {
  constructor(
    id: string,
    public nome: string,
    public area: AreaInteresse,
    public descricao: string,
    public cursos: Curso[] = [],
  ) {
    super(id);
  }
  get total(): number {
    return this.cursos.length;
  }
  get concluidos(): number {
    return this.cursos.filter((c) => c.concluido).length;
  }
  progresso(): number {
    if (this.total === 0) return 0;
    return Math.round((this.concluidos / this.total) * 100);
  }
  toJSON(): Record<string, any> {
    return {
      id: this._id,
      nome: this.nome,
      area: this.area,
      descricao: this.descricao,
      cursos: this.cursos.map((c) => c.toJSON()),
    };
  }
}
