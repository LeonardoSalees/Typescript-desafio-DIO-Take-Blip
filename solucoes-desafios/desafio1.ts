// solutionOne
interface IEmployee{
  name:string
  code:number
}
const employee = {} as IEmployee;
employee.code = 10;
employee.name = "John";

// solutionTwo
const carlosEmployeeTwo:IEmployee ={
  name: 'Carlos',
  code: 300
}
carlosEmployeeTwo.name = 'Carlos Bezerra'
carlosEmployeeTwo.code = 301

// solutionThree
const jorgeEmployeeThree:{ name:string, code:number}={
  name: 'Jorge',
  code: 200
}

// SolutionFour

const cleberEmployeeFour = {
  code:211,
  name:'cleber'
}
