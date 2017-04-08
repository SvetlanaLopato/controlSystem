import { teachers } from './data/teachers';
import { students } from './data/students';
// import { subjects } from './data/tasks';

function dataBaseService() {
	const TEACHER_ROLE = 'teacher';
	const STUDENT_ROLE = 'student';
	let currentUserId, boardParam, selectedGroup;

	return {
		isAuthotized,
		checkAuthenticity,
		getUserProperty,
		// getUser,
		getUserRole,
		getStudentsList,
		getSubjectsList,
		getTasks,
	}

	function isAuthotized() {
		if (currentUserId) {
			return true;
		}
	}

	function checkAuthenticity(email, password) {

		return checkEmailAndPassword(teachers, email, password) ? TEACHER_ROLE :
			   checkEmailAndPassword(students, email, password) ? STUDENT_ROLE : '';
	}

	function checkEmailAndPassword(arr, email, password) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].email === email && arr[i].password === password) {
				currentUserId = arr[i].id;
				return true;
			}
		}
	}

	function getUserProperty(property) {
		let value;

		[...teachers, ...students].forEach(user => {
			if (user.id === currentUserId) {
				value = user[property];
			}
		});

		return value || [];
	}

	function getStudentsList(group = selectedGroup) {
		let studentList = [];
		selectedGroup = group;

		students.forEach(student => {
			if (student.group === group) {
				studentList.push(student);
			}
		})

		return studentList;
	}

	function getSubjectsList() {
		let subjects = getUserProperty('subjects').map(subject => subject.title);

		return subjects;
	}

	////////////////////////////////////////

	function getStudentTasks(id) {
		let tasks;

		students.forEach(student => {
			if (student.id === id) {
				tasks = transformTasks(student.subjects);
			}
		})

		return tasks;
	}

	function filterTasksBySubject(tasks = [], subject) {
		let filteredTask = tasks.filter(task => task.title === subject)

		return filteredTask;
	}

	function getTasks(boardParam) {
		if (getUserRole() === STUDENT_ROLE) {
			return filterTasksBySubject(getStudentTasks(currentUserId), boardParam);
		} else {
			return filterTasksBySubject(getStudentTasks(Number(boardParam)), getUserProperty('subject'));
		}
	}

	function transformTasks(studentSubjects) {
		let transformedTasks = [];

		studentSubjects.forEach(subject => {
			subject.tasks.forEach(task => {
				transformedTasks.push(Object.assign(task, { title: subject.title }));
			});
		});

		return transformedTasks;
	}

	// function getSubjectInfo(subject) {
	// 	let subjectInfo;

	// 	subjects.map(subject => {
	// 		if (subject.title === subject) {
	// 			subjectInfo = subject;
	// 		}
	// 	})

	// 	return subjectInfo;
	// }

	function getUserRole() {
		if (teachers.findIndex(teacher => teacher.id === currentUserId) > -1) {
			return TEACHER_ROLE;
		} else if (students.findIndex(student => student.id === currentUserId) > -1) {
			return STUDENT_ROLE;
		}
	}
}	

export default dataBaseService();