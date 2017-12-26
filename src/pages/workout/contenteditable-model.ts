import {Directive,EventEmitter,Renderer, ElementRef, Input, Output,OnChanges} from '@angular/core';

@Directive({
	selector: '[contenteditableModel]',
	host: {
		'(blur)': 'onBlur()'
	}
})
export class ContenteditableModel implements OnChanges {
	@Input('contenteditableModel') model: number;
	@Output('contenteditableModelChange') update = new EventEmitter();

	private lastViewModel: any;


	constructor(private elRef: ElementRef,private renderer: Renderer) {
	}

	ngOnChanges(changes:any) {
        if (changes.model.isFirstChange()){
            this.refreshView();
        }    
	}

	onBlur() {
		var value = this.elRef.nativeElement.innerText;
		this.lastViewModel = value;
		this.update.emit(value);
	}

	select(){
		this.renderer.selectRootElement(this.elRef.nativeElement).select();
	}

	private refreshView() {
		this.elRef.nativeElement.innerText = this.model
	}
}
