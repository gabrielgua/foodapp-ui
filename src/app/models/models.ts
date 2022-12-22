export class Usuario {
    id?: number
    nome?: string
    email?: string
    _links = new Links();
  }
  
  export class Links {
    self? = new Self();
    usuarios? = new Usuarios();
    "grupos-usuarios"? = new GruposUsuarios();
    restaurantes? = new Restaurantes();
    cozinhas? = new Cozinhas();
  }

  export class Endereco {
    cep?: string
    numero?: string
    logradouro?: string
    complemento?: any
    bairro?: string
    cidade = new Cidade()
  }
  
  export class Cidade {
    id?: number
    nome?: string
    estado?: string
    _links?: Links
  }
  
  export class Self {
    href?: string
  }
  
  export class Usuarios {
    href?: string
  }

  export class Restaurantes {
    href?: string
  }

  export class Cozinhas {
    href?: string
  }
  
  export class GruposUsuarios {
    href?: string
  }

  export class Restaurante {
    id?: number
    nome?: string
    taxaFrete?: number
    cozinha = new Cozinha()
    ativo?: boolean
    aberto?: boolean
    endereco = new Endereco()
    _links = new Links()
  }
  
  export class Cozinha {
    id?: number
    nome?: string
    _links?: Links
  }

  export class Produtos {
    href?: string
    templated?: boolean
  }
  
  export class FormasPagamento {
    href?: string
  }
  
  export class Responsaveis {
    href?: string
  }
  
  export class Inativar {
    href?: string
  }
  
  export class Fechar {
    href?: string
  }
  