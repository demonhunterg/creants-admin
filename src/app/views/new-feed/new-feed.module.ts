import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgaModule } from '../../theme/nga.module';
import { routing }       from './new-feed.routing';
import {NewFeedComponent} from './new-feed.component'
import { AppTranslationModule } from '../../app.translation.module';
import { Ckeditor } from './components/ckeditor/ckeditor.component';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    AngularFormsModule,
    NgaModule,
    CKEditorModule,
    routing
  ],
  declarations: [NewFeedComponent, Ckeditor]
})
export class NewFeedModule {
}
