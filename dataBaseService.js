import { teachers } from './data/teachers';
import { students } from './data/students';
// import { subjects } from './data/tasks';

function dataBaseService() {
	const TEACHER_ROLE = 'teacher';
	const STUDENT_ROLE = 'student';
	let currentUserId, boardParam, selectedGroup, currentTasks;

	return {
		checkAuthenticity,
		isAuthotized,
		getUserProperty,
		getStudentProperty,
		getUserRole,
		getStudentsList,
		getSubjectsList,
		getTasks,
		editTaskProperty,
		setComment,
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
				return;
			}
		});

		return value || [];
	}

	function getStudentsList(group = selectedGroup) {
		let studentsList = [];
		selectedGroup = group;

		students.forEach(student => {
			if (student.group === group) {
				studentsList.push(student);
			}
		})

		return studentsList;
	}

	function getSubjectsList() {
		let subjects = getUserProperty('subjects').map(subject => subject.title);

		return subjects;
	}

	function getStudentTasks(id) {
		let tasks;

		students.forEach(student => {
			if (student.id === id) {
				tasks = transformTasks(student.subjects);
				return;
			}
		})

		return tasks;
	}

	function filterTasksBySubject(tasks = [], subject) {
		let filteredTask = tasks.filter(task => task.title === subject)

		return filteredTask;
	}

	function getTasks(boardParam) {
		let copyTasks = [];

		if (getUserRole() === STUDENT_ROLE) {
			currentTasks = filterTasksBySubject(getStudentTasks(currentUserId), boardParam);
		} else {
			currentTasks = filterTasksBySubject(getStudentTasks(Number(boardParam)), getUserProperty('subject'));
		}

		currentTasks.forEach(task => {
			copyTasks.push(Object.assign({}, task));
		})

		return copyTasks;
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

	function editTaskProperty(id, propertyName, newValue) {
		currentTasks.forEach(task => {
			if (task.id === id) {
				if (Array.isArray(task[propertyName])) {
					task[propertyName].push(newValue);
				} else {
					task[propertyName] = newValue;
				}
				return;
			}
		})
	}

	function getUserRole() {
		if (teachers.findIndex(teacher => teacher.id === currentUserId) > -1) {
			return TEACHER_ROLE;
		} else if (students.findIndex(student => student.id === currentUserId) > -1) {
			return STUDENT_ROLE;
		}
	}

	function getStudentProperty(id, property) {
		let value;

		students.forEach(student => {
			if (student.id === parseInt(id)) {
				value = student[property];
				return;
			}
		})

		return value;
	}

	function setComment(id, text) {
		let message = {
			author: getUserProperty('name'),
			message: text,
		};

		editTaskProperty(id, 'comments', message)
	}
}	

export default dataBaseService();