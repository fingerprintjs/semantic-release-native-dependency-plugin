# Contributing to Semantic Release Native SDK Plugin

We appreciate your interest in contributing to this project! Follow the guidelines below to set up your development
environment, make changes, and submit your contributions.

## How To Contribute?

1. **Fork the Repository**
    - Click the "Fork" button on GitHub and create your own copy of the repository.
2. **Clone the Repository**
    ```shell
    git clone https://github.com/<your-username>/semantic-release-native-sdk-plugin.git
    cd semantic-release-native-sdk-plugin
    ```
3. **Install Dependencies**
    ```shell
    pnpm install
    ```
4. Follow [Development Workflow][development-workflow] in the `README.md` file.
  
## Code Style

This project follows a strict code style using **ESLint** and **Prettier**. Ensure your code passes all linting rules
before submitting a pull request.

## Commit Guidelines

We use [Conventional Commits][conventional-commits] to maintain consistency in commit messages. Example:

```shell
git commit -m "feat: add support for ..."
```

Use the following prefixes for your commits:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `chore`: Maintenance or tooling updates
- `test`: Adding or updating tests
- `refactor`: Code restructuring without changing functionality

## Pull Request Process

1. Ensure all tests pass by running:
    ```shell
    pnpm test
    ```
2. Make sure your code follows linting rules:
    ```shell
    pnpm lint
    ```
3. Push your changes to a new branch and open a pull request.
4. Provide a clear description of your changes.
5. Wait for a maintainer to review and merge your PR.

## Reporting Issues

If you find a bug or have a feature request, please [open an issue][open-issue] with a detailed description.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

[open-issue]: https://github.com/fingerprintjs/semantic-release-native-sdk-plugin/issues/new
[development-workflow]: https://github.com/fingerprintjs/semantic-release-native-sdk-plugin?tab=readme-ov-file#development-workflow
[conventional-commits]: https://conventionalcommits.org
