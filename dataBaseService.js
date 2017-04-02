import { teachers } from './data/teachers';
import { students } from './data/students';

function dataBaseService() {
	const TEACHER_ROLE = 'teacher';
	const STUDENT_ROLE = 'student';

	return {
		checkAuthenticity,
		getUserName,
		getUser,
		getUserRole,
	}

	function checkAuthenticity(email, password) {

		return checkEmailAndPassword(teachers, email, password) ? TEACHER_ROLE :
		   	   checkEmailAndPassword(students, email, password) ? STUDENT_ROLE : '';
	}

	function checkEmailAndPassword(arr, email, password) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].email === email && arr[i].password === password) {
				return true;
			}
		}
	}

	function getUserName(id) {
		[...teacher, ...students].map(user => {
			if (user.id === id) {
				return user.name;
			}
		});
	}

	function getUser(id) {
		[...teacher, ...students].map(user => {
			if (user.id === id) {
				return user;
			}
		})
	}

	function getUserRole(id) {
		if (teachers.find(user => user.id === id) > -1) {
			return TEACHER_ROLE;
		} else if (student.find(user => user.id === id) > -1) {
			return STUDENT_ROLE;
		}
	}
}	

export default dataBaseService();