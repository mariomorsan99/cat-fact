export class Facts {
    id: string;
    text: string;
    type: string;
    user: Users[];
}

export class Users {
    id: string;
    name: Name[];
}

export class Name {
    first: string;
    last: string;
}