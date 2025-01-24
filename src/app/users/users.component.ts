// users.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [
    { _id: '1', username: 'johndoe', email: 'johndoe@example.com', fullName: 'John Doe' },
    { _id: '2', username: 'janedoe', email: 'janedoe@example.com', fullName: 'Jane Doe' },
    { _id: '3', username: 'bobsmith', email: 'bobsmith@example.com', fullName: 'Bob Smith' },
    { _id: '4', username: 'alicesmith', email: 'alicesmith@example.com', fullName: 'Alice Smith' },
    { _id: '5', username: 'charliebrown', email: 'charliebrown@example.com', fullName: 'Charlie Brown' }
  ];
  loading = true;
  currentPage = 1;
  totalPages = 1;
  searchQuery = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(page: number = 1): void {
    this.loading = true;
    const url = `http://localhost:8000/api/v1/users/users?page=${page}&limit=5`;
    this.http.get<any>(url).subscribe(
      (response) => {
        this.users = response.users || [];
        this.totalPages = response.totalPages || 1;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    );
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.users.sort((a, b) =>
      this.sortOrder === 'asc'
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username)
    );
  }

  openUserDialog(user: any = null): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user ? { ...user } : { username: '', email: '', fullName: '', password: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (user) {
          this.updateUser(result);
        } else {
          this.createUser(result);
        }
      }
    });
  }

  updateUser(user: any): void {
    const url = `http://localhost:8000/api/v1/users/user/${user._id}`;
    this.http.put(url, user).subscribe(
      (updatedUser: any) => {
        const index = this.users.findIndex((u) => u._id === updatedUser._id);
        if (index > -1) {
          this.users[index] = updatedUser;
        }
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  createUser(user: any): void {
    const url = `http://localhost:8000/api/v1/users/createuser`;
    this.http.post(url, user).subscribe(
      (newUser: any) => {
        this.users.push(newUser);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      const url = `http://localhost:8000/api/v1/users/user/${userId}`;
      this.http.delete(url).subscribe(
        () => {
          this.users = this.users.filter((u) => u._id !== userId);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
