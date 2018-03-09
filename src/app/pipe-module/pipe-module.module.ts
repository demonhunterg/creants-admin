import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyNewPipePipe } from '../my-new-pipe.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MyNewPipePipe]
})
export class PipeModuleModule {
  static forRoot() {
    return {
      ngModule: PipeModuleModule,
      providers: [],
    };
  }
}
