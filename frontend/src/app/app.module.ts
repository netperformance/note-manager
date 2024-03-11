import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NoteCreatorComponent } from './note-creator/note-creator.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
  { path: '', component: EmptyComponent },
  { path: 'home', component: WelcomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'contact', component: ContactComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    HeaderComponent,
    FooterComponent,
    NoteCreatorComponent,
    SettingsComponent,
    ContactComponent,
    EmptyComponent,
    LoginComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
