import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Observable, Subject, timer } from 'rxjs';

@Component({
    selector: 'app-gateway-form',
    templateUrl: './gateway-form.component.html',
})
export class GatewayFormComponent implements OnInit {
    form: FormGroup;

    private _loadingController: Subject<boolean>;
    loading$: Observable<boolean>;

    constructor(
        private _drawerRef: NzDrawerRef<string>,
        private _fb: FormBuilder
    ) {
        this.form = this._fb.group({
            name: [null, [Validators.required]],
            ipv4: [null, [Validators.required]],
        });

        // set up state management for this component
        this._loadingController = new Subject();
        this.loading$ = this._loadingController.asObservable();
    }

    ngOnInit(): void {}

    /** Closes the drawer */
    close(): void {
        this._drawerRef.close();
    }

    /** Called when the submit but is clicked */
    onSubmit(): void {
        if (this.form.valid) {
            // submit data
            this._loadingController.next(true);
            timer(3000).subscribe(() => {
                this._loadingController.next(false);
                this._drawerRef.close();
            });
        } else {
            Object.values(this.form.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }
}
