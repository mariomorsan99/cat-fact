export class Facts {
    id: string;
    text: string;
    type: string;
    user: Users[];
    upvotes: string;
}

export class Users {
    id: string;
    name: Name[];
}

export class Name {
    first: string;
    last: string;
}