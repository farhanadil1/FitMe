package com.fitme.backend.services;

import java.util.List;

import com.fitme.backend.models.Users;

public interface IUsersService {
	public Users createUsers(Users user);
	public Users updateUsers(Users user);
	public String deleteUsers(Users user);
	public String deleteUsers(int id);
	public Users getUserById(int id);
	public List<Users>	getAll();
	public Users validateUsers(String emailid,String password);

}
