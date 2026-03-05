### Hi there, I'm Hamza Hassan 👋  
_A software (read: **Product**) engineer living one git-commit at a time._

I specialize in building and deploying software solutions in AI and SaaS. From designing secure backend systems to creating seamless user interfaces, I'm passionate about crafting high-quality software. Skilled in event-driven architecture, cloud infrastructure, and RLHF pipelines, I've worked on training and fine-tuning LLMs through human feedback, preference modeling, and Rubric design. I thrive in collaborative environments and enjoy learning new technologies.

Currently maintaining 2 open-source packages 👇

- [infra-foundry](https://github.com/0xhssn/infra-foundry), a platform-agnostic cloud infrastructure components library built with TypeScript and Pulumi, covering AWS, Cloudflare, and more.
- [jotai-transaction](https://github.com/jotaijs/jotai-transaction), a utility package adding transaction support to [Jotai](https://github.com/pmndrs/jotai) state management.

Contributions welcome!

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

---

### 🔍 Monitoring and Observability Guidelines

Effective monitoring and observability practices are crucial for maintaining and debugging applications built with `infra-foundry` and `jotai-transaction`. This section provides comprehensive strategies to ensure your applications remain performant and easily debuggable.

#### For infra-foundry

1. **Logging Best Practices:**
   - Use structured logging with consistent formats across your infrastructure components.
   - Include relevant metadata such as resource IDs, timestamps, and environment information.
   - Implement log levels (DEBUG, INFO, WARN, ERROR) to categorize log messages effectively.

2. **Performance Metrics:**
   - Monitor resource utilization (CPU, memory, network) for each infrastructure component.
   - Track API call latencies and error rates for services deployed using infra-foundry.
   - Set up alerts for abnormal resource consumption or service degradation.

3. **Tracing:**
   - Implement distributed tracing to understand request flows across your infrastructure.
   - Use unique trace IDs to correlate logs and metrics across different services.

4. **Dashboards and Visualization:**
   - Create dashboards that provide an overview of your infrastructure health.
   - Include visualizations for key performance indicators (KPIs) specific to your application.

5. **Integration with Cloud Monitoring Services:**
   - Leverage AWS CloudWatch or similar services for centralized monitoring of cloud resources.
   - Use Pulumi's built-in integrations to export metrics to your preferred monitoring platform.

#### For jotai-transaction

1. **State Management Monitoring:**
   - Implement logging for state changes, including the atoms involved and the transaction status.
   - Track the frequency and duration of transactions to identify potential performance bottlenecks.

2. **Performance Metrics:**
   - Monitor the time taken for transactions to complete.
   - Track the number of successful vs. failed transactions.
   - Measure the impact of transactions on overall application performance.

3. **Debugging Strategies:**
   - Use the Jotai DevTools for real-time inspection of atom values and transaction states.
   - Implement custom error boundaries to catch and log transaction-related errors.

4. **Testing and Validation:**
   - Set up unit tests to verify the correctness of complex transactions.
   - Implement integration tests that simulate real-world usage patterns of your state management.

5. **Application Performance Monitoring (APM):**
   - Integrate with APM tools like New Relic or Datadog to get insights into how state management affects your application's overall performance.

By following these guidelines, you'll be able to maintain a high level of observability in your applications, leading to faster issue resolution and improved overall performance. Remember to adapt these practices to your specific use cases and scale them as your application grows.

---

### 🧪 Testing

This project includes a test suite to ensure the effectiveness of our monitoring and observability guidelines. To run the tests:

1. Ensure you have Node.js and npm installed on your system.
2. Install the project dependencies:
   ```
   npm install
   ```
3. Run the tests:
   ```
   npm test
   ```

#### Writing New Tests

When adding new features or modifying existing ones, please follow these guidelines for writing tests:

1. Create new test files in the `tests` directory with the naming convention `*.test.ts`.
2. Use descriptive test names that clearly indicate what is being tested.
3. Mock external services and resources using the functions provided in `tests/mocks.ts`.
4. Ensure your tests cover both success and failure scenarios.
5. Keep tests isolated and avoid dependencies between test cases.

By maintaining a comprehensive test suite, we can ensure that our monitoring and observability features remain effective as the project evolves.
