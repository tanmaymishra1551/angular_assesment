import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;
  searchQuery = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(page: number = 1): void {
    this.loading = true;
    const url = `http://localhost:8000/api/v1/users/get?page=${page}&limit=5`;
    this.http.get<any>(url).subscribe(
      (response) => {
        this.users = response.users || [];
        this.totalPages = response.totalPages || 1;
        this.currentPage = page;
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
    const url = `http://localhost:8000/api/v1/users/update/${user._id}`;
    this.http.put(url, user).subscribe(
      () => {
        this.fetchUsers(this.currentPage); // Refresh table data
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  createUser(user: any): void {
    const url = `http://localhost:8000/api/v1/users/create`;
    this.http.post(url, user).subscribe(
      () => {
        this.fetchUsers(this.currentPage); // Refresh table data
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      const url = `http://localhost:8000/api/v1/users/delete/${userId}`;
      this.http.delete(url).subscribe(
        () => {
          this.fetchUsers(this.currentPage); // Refresh table data
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
