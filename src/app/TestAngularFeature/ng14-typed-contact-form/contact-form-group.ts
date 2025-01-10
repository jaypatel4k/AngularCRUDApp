import { FormControl } from "@angular/forms";

export interface contactFormGroup {
    name: FormControl<string>;
    email: FormControl<string>;
    contactNumber?: FormControl<Number | null>; //makes controls as optional
    query?: FormControl<string | null>;//? makes controls as optional
}
