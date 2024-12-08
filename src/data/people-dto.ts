import { Person } from "./people-interface";

export type PersonLoginBodyDTO = Pick<Person,"email"|"password">