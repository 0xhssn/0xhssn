### Hi there, I'm Hamza Hassan 👋  
_A software (read: **Product**) engineer living one git-commit at a time._

I specialize in building and deploying software solutions in AI and SaaS. From designing secure backend systems to creating seamless user interfaces, I'm passionate about crafting high-quality software. Skilled in event-driven architecture, cloud infrastructure, and RLHF pipelines, I've worked on training and fine-tuning LLMs through human feedback, preference modeling, and Rubric design. I thrive in collaborative environments and enjoy learning new technologies.

Currently maintaining 2 open-source packages 👇

- [infra-foundry](https://github.com/0xhssn/infra-foundry), a platform-agnostic cloud infrastructure components library built with TypeScript and Pulumi, covering AWS, Cloudflare, and more.
- [jotai-transaction](https://github.com/jotaijs/jotai-transaction), a utility package adding transaction support to [Jotai](https://github.com/pmndrs/jotai) state management.

Contributions welcome!

## API Documentation

### infra-foundry

#### Overview
`infra-foundry` is a platform-agnostic cloud infrastructure components library built with TypeScript and Pulumi. It provides reusable components for AWS, Cloudflare, and other cloud providers.

#### Installation
```bash
npm install infra-foundry
```

#### API

1. AWS Components

   a. EC2 Instance
   ```typescript
   import { EC2Instance } from 'infra-foundry/aws';

   const instance = new EC2Instance('my-instance', {
     instanceType: 't2.micro',
     ami: 'ami-12345678',
     // ... other configuration options
   });
   ```

   b. S3 Bucket
   ```typescript
   import { S3Bucket } from 'infra-foundry/aws';

   const bucket = new S3Bucket('my-bucket', {
     acl: 'private',
     versioning: true,
     // ... other configuration options
   });
   ```

2. Cloudflare Components

   a. DNS Record
   ```typescript
   import { DNSRecord } from 'infra-foundry/cloudflare';

   const record = new DNSRecord('my-record', {
     name: 'example.com',
     type: 'A',
     value: '192.0.2.1',
     // ... other configuration options
   });
   ```

For more detailed documentation and examples, please refer to the [infra-foundry GitHub repository](https://github.com/0xhssn/infra-foundry).

### jotai-transaction

#### Overview
`jotai-transaction` is a utility package that adds transaction support to the Jotai state management library. It allows you to group multiple state updates into a single atomic operation.

#### Installation
```bash
npm install jotai-transaction
```

#### API

1. createTransactionAtom
```typescript
import { createTransactionAtom } from 'jotai-transaction';

const transactionAtom = createTransactionAtom();
```

2. useTransaction Hook
```typescript
import { useTransaction } from 'jotai-transaction';

const MyComponent = () => {
  const [startTransaction, commitTransaction, rollbackTransaction] = useTransaction();

  const handleUpdate = () => {
    startTransaction();
    // Perform multiple state updates
    // ...
    commitTransaction();
  };

  const handleError = () => {
    rollbackTransaction();
  };

  // ...
};
```

3. Transaction Operations
   - `startTransaction()`: Begins a new transaction.
   - `commitTransaction()`: Applies all changes made during the transaction.
   - `rollbackTransaction()`: Reverts all changes made during the transaction.

Example usage:
```typescript
import { atom, useAtom } from 'jotai';
import { useTransaction } from 'jotai-transaction';

const countAtom = atom(0);
const nameAtom = atom('');

const MyComponent = () => {
  const [count, setCount] = useAtom(countAtom);
  const [name, setName] = useAtom(nameAtom);
  const [startTransaction, commitTransaction, rollbackTransaction] = useTransaction();

  const handleUpdate = () => {
    startTransaction();
    setCount(count + 1);
    setName('New Name');
    commitTransaction();
  };

  // ...
};
```

For more detailed documentation and examples, please refer to the [jotai-transaction GitHub repository](https://github.com/jotaijs/jotai-transaction).


---
<div align="center">

### 🛠 My Skill Set

  
| **Languages**     | **Frameworks**      | **Cloud**       | **Databases**  |
|-------------------|---------------------|-----------------|----------------|
| TypeScript        | Next.js (React)     | AWS             | PostgreSQL     |
| JavaScript        | Node.js (NestJS)    | Serverless      | MySQL          |
| Ruby              | Ruby on Rails       | Kubernetes      | MongoDB        |
| Python            | Gatsby              | CI/CD pipelines | Amazon RDS     |
| GO                | Gin                 | Pulumi          |                |
| GraphQL           |                     |                 |                |

</div>

---

### 📫 Get in Touch
- **LinkedIn:** [hhssnn](https://www.linkedin.com/in/hhssnn)
- **Email:** hassanhamza0101@gmail.com
