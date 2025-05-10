package com.fitme.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fitme.backend.models.Users;
import com.fitme.backend.repositories.IUsersrepository;
@Service
public class UsersService implements IUsersService {

//add the dependency
	@Autowired
	IUsersrepository usersrepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Override
	public Users createUsers(Users user) {
		// Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
		return usersrepository.save(user);
	}

	@Override
	public Users updateUsers(Users user) {
		// TODO Auto-generated method stub
		return usersrepository.save(user);
	}

	@Override
	public String deleteUsers(Users user) {
		// TODO Auto-generated method stub
		usersrepository.delete(user);
		return "User is deleted Successfully";
	}

	@Override
	public String deleteUsers(int id) {
	Optional<Users> u=	usersrepository.findById(id);
	//check the object is found or not
	Users user=null;
	if(u.isPresent())
	{
		//get the user object
		user=u.get();
	//delete the user object
	usersrepository.delete(user);
	return "User is deleted Successfully";
		
	}
	return "User is not found with ID:"+ id;
	}
	@Override
	public Users getUserById(int id) {
		// TODO Auto-generated method stub
		return (Users)usersrepository.findById(id).get();
	}

	@Override
	public List<Users> getAll() {
		// TODO Auto-generated method stub
		return usersrepository.findAll();
	}

	@Override
	public Users validateUsers(String emailid, String password) {
	    Users user = usersrepository.findByEmailid(emailid);
	    
	    if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
	        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
	    }
	    
	    return user;
	}

}
