// auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => this.router.navigate(['/']));
  }

  // Returns an observable that emits the user or null
  getAuthState(): Observable<User | null> {
    return authState(this.auth);
  }

  // Still usable for quick sync access (may be null immediately after reload)
  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}
