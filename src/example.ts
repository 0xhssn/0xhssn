/**
 * Example TypeScript File - Best Practices Guide
 * This file demonstrates proper TypeScript syntax, types, and patterns
 */

// ============================================================================
// 1. BASIC TYPES
// ============================================================================

// Primitive types
const userName: string = 'Hamza Hassan';
const age: number = 30;
const isActive: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;

// Arrays
const numbers: number[] = [1, 2, 3, 4, 5];
const names: Array<string> = ['Alice', 'Bob', 'Charlie'];

// Tuples - fixed length arrays with specific types
const person: [string, number] = ['John', 25];

// ============================================================================
// 2. INTERFACES - Define object shapes
// ============================================================================

interface User {
  id: string;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Read-only property
}

interface Admin extends User {
  permissions: string[];
  role: 'admin' | 'super-admin'; // Union type / Literal type
}

// ============================================================================
// 3. TYPE ALIASES - Alternative to interfaces
// ============================================================================

type ID = string | number;

type Status = 'pending' | 'active' | 'inactive' | 'deleted';

type UserRole = 'user' | 'admin' | 'moderator';

type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

// ============================================================================
// 4. FUNCTIONS
// ============================================================================

// Function with typed parameters and return type
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Function with optional parameters
function createUser(name: string, age?: number): User {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email: `${name.toLowerCase()}@example.com`,
    age,
    createdAt: new Date(),
  };
}

// Function with default parameters
function calculateTotal(price: number, tax: number = 0.1): number {
  return price + price * tax;
}

// Arrow function
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Arrow function with implicit return
const add = (a: number, b: number): number => a + b;

// Function with rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Async function
async function fetchUser(id: string): Promise<User> {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
      });
    }, 1000);
  });
}

// ============================================================================
// 5. CLASSES
// ============================================================================

class Product {
  // Private properties
  private id: string;
  private price: number;

  // Public properties
  public name: string;
  public description: string;

  // Protected property (accessible in subclasses)
  protected category: string;

  // Static property
  static readonly TAX_RATE: number = 0.1;

  constructor(name: string, price: number, category: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = '';
  }

  // Getter
  get totalPrice(): number {
    return this.price + this.price * Product.TAX_RATE;
  }

  // Setter
  set updatePrice(newPrice: number) {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    this.price = newPrice;
  }

  // Public method
  public getInfo(): string {
    return `${this.name} - $${this.totalPrice.toFixed(2)}`;
  }

  // Static method
  static createDiscount(product: Product, discount: number): number {
    return product.totalPrice * (1 - discount);
  }
}

// Subclass
class DigitalProduct extends Product {
  private downloadUrl: string;

  constructor(name: string, price: number, downloadUrl: string) {
    super(name, price, 'digital');
    this.downloadUrl = downloadUrl;
  }

  public getDownloadLink(): string {
    return this.downloadUrl;
  }
}

// ============================================================================
// 6. GENERICS - Reusable code with type safety
// ============================================================================

// Generic function
function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

// Using the generic function
const firstNumber = getFirstElement<number>([1, 2, 3]); // Type: number | undefined
const firstName = getFirstElement<string>(['Alice', 'Bob']); // Type: string | undefined

// Generic interface
interface Repository<T> {
  find(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

// Generic class
class DataStore<T extends { id: string }> {
  private items: Map<string, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  get(id: string): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  remove(id: string): boolean {
    return this.items.delete(id);
  }
}

// ============================================================================
// 7. UNION AND INTERSECTION TYPES
// ============================================================================

// Union type - can be one of several types
type Result = string | number | boolean;

function processResult(result: Result): string {
  // Type narrowing with typeof
  if (typeof result === 'string') {
    return result.toUpperCase();
  } else if (typeof result === 'number') {
    return result.toFixed(2);
  } else {
    return result ? 'true' : 'false';
  }
}

// Intersection type - combines multiple types
type Employee = {
  employeeId: string;
  department: string;
};

type Person = {
  name: string;
  age: number;
};

type EmployeePerson = Employee & Person;

const employee: EmployeePerson = {
  employeeId: 'E001',
  department: 'Engineering',
  name: 'Alice',
  age: 28,
};

// ============================================================================
// 8. TYPE GUARDS AND TYPE NARROWING
// ============================================================================

// Type predicate function
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'email' in obj;
}

// Using type guard
function processData(data: unknown): void {
  if (isUser(data)) {
    // TypeScript knows data is User here
    console.log(`User: ${data.name}, Email: ${data.email}`);
  }
}

// ============================================================================
// 9. UTILITY TYPES
// ============================================================================

// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Required - makes all properties required
type RequiredUser = Required<User>;

// Pick - selects specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - excludes specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// Readonly - makes all properties readonly
type ReadonlyUser = Readonly<User>;

// Record - creates an object type with specific keys and values
type UserRoles = Record<string, UserRole>;

const roles: UserRoles = {
  user1: 'admin',
  user2: 'user',
  user3: 'moderator',
};

// ============================================================================
// 10. ENUMS
// ============================================================================

// Numeric enum
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// String enum
enum LogLevel {
  Error = 'ERROR',
  Warning = 'WARNING',
  Info = 'INFO',
  Debug = 'DEBUG',
}

function log(message: string, level: LogLevel): void {
  console.log(`[${level}] ${message}`);
}

// ============================================================================
// 11. MODULES - Import/Export
// ============================================================================

// Export individual items
export { User, Admin, createUser, fetchUser };

// Export types
export type { ApiResponse, Status, UserRole };

// Export class
export { Product, DigitalProduct };

// Default export (only one per file)
export default class Application {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  start(): void {
    console.log(`Starting application: ${this.name}`);
  }
}

// ============================================================================
// 12. PRACTICAL EXAMPLE - Complete Feature
// ============================================================================

interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

class TaskManager {
  private tasks: Map<string, Task> = new Map();

  createTask(title: string, description: string, priority: Task['priority'] = 'medium'): Task {
    const task: Task = {
      id: this.generateId(),
      title,
      description,
      status: 'pending',
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.set(task.id, task);
    return task;
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const task = this.tasks.get(id);
    if (!task) {
      return null;
    }

    const updatedTask: Task = {
      ...task,
      ...updates,
      updatedAt: new Date(),
    };

    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  deleteTask(id: string): boolean {
    return this.tasks.delete(id);
  }

  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getTasksByStatus(status: Status): Task[] {
    return this.getAllTasks().filter((task) => task.status === status);
  }

  private generateId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Usage example
const taskManager = new TaskManager();
const newTask = taskManager.createTask('Learn TypeScript', 'Complete TS tutorial', 'high');
console.log(`Created task: ${newTask.title}`);

// ============================================================================
// 13. ERROR HANDLING
// ============================================================================

class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format', 'email');
  }
}

async function saveUser(user: User): Promise<void> {
  try {
    validateEmail(user.email);
    // Save user logic here
    console.log('User saved successfully');
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(`Validation failed for field: ${error.field}`);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

// ============================================================================
// 14. DECORATORS (Experimental - requires tsconfig settings)
// ============================================================================

/*
// Note: Enable experimentalDecorators in tsconfig.json to use decorators

function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
  
  return descriptor;
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}
*/
