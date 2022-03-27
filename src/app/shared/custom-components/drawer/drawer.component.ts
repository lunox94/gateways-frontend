import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-drawer',
    templateUrl: './drawer.component.html',
})
export class DrawerComponent implements OnInit {
    /** Whether or not the drawer is visible. */
    @Input() visible = false;

    /** Emits when the internal drawer emits its close event. */
    @Output() onClose = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
}
