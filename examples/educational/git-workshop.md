# Git Workshop

Version Control for Developers

---

## Welcome! 👋

### What We'll Cover Today

- Git fundamentals
- Basic commands
- Branching strategies  
- Collaboration workflows
- Best practices

**Duration:** 2 hours with hands-on exercises

---

## What is Git?

--

### Version Control System

Git tracks changes in your code over time

```
Project Timeline:
v1.0 → v1.1 → v1.2 → v2.0
 │      │      │      │
 │      │      │      └─ Added user auth
 │      │      └─ Fixed bug #123
 │      └─ Added new feature
 └─ Initial release
```

--

### Why Use Git?

✅ **Track changes** - See what changed and when  
✅ **Collaboration** - Multiple people, same project  
✅ **Backup** - Never lose your work  
✅ **Branching** - Work on features separately  
✅ **Rollback** - Undo changes safely

---

## Setup & Configuration

--

### Installation Check

```bash
# Check if Git is installed
git --version

# Should output something like:
# git version 2.39.0
```

--

### First-Time Setup

```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check your config
git config --list
```

---

## 🛠️ Hands-On Exercise #1

### Create Your First Repository

```bash
# 1. Create a new directory
mkdir my-first-repo
cd my-first-repo

# 2. Initialize Git
git init

# 3. Check status
git status
```

**Expected output:** `On branch main, No commits yet`

---

## Basic Git Workflow

--

### The Three States

```
Working Directory → Staging Area → Repository
     (modified)      (staged)      (committed)
```

--

### Essential Commands

```bash
# Check status
git status

# Add files to staging
git add filename.txt
git add .  # Add all files

# Commit changes
git commit -m "Your commit message"

# View history
git log --oneline
```

---

## 🛠️ Hands-On Exercise #2

### Your First Commit

```bash
# 1. Create a file
echo "Hello Git!" > README.md

# 2. Check status
git status

# 3. Stage the file
git add README.md

# 4. Commit
git commit -m "Add README file"

# 5. View history
git log --oneline
```

---

## Branching

--

### What are Branches?

Branches let you work on different features simultaneously

```
main    A---B---C---F---G
             \         /
feature       D---E---/
```

--

### Branch Commands

```bash
# List branches
git branch

# Create new branch
git branch feature-login

# Switch to branch
git checkout feature-login
# Or newer syntax:
git switch feature-login

# Create and switch in one command
git checkout -b feature-signup
```

---

## 🛠️ Hands-On Exercise #3

### Working with Branches

```bash
# 1. Create and switch to new branch
git checkout -b add-feature

# 2. Make changes
echo "New feature!" >> README.md

# 3. Commit changes
git add README.md
git commit -m "Add new feature"

# 4. Switch back to main
git checkout main

# 5. Check the difference
cat README.md
```

---

## Merging

--

### Combining Branches

```bash
# Switch to target branch (usually main)
git checkout main

# Merge feature branch
git merge feature-login

# Delete merged branch (optional)
git branch -d feature-login
```

--

### Merge Types

**Fast-forward merge:**
```
main    A---B---C
             \
feature       D
```
Result: `A---B---C---D`

**Three-way merge:**
```
main    A---B---C---M
             \     /
feature       D---E
```

---

## Remote Repositories

--

### GitHub/GitLab Integration

```bash
# Add remote repository
git remote add origin https://github.com/username/repo.git

# Push to remote
git push -u origin main

# Pull from remote
git pull origin main

# Clone existing repository
git clone https://github.com/username/repo.git
```

--

### Collaboration Workflow

1. **Clone** the repository
2. **Create** a feature branch
3. **Make** changes and commit
4. **Push** branch to remote
5. **Create** pull request
6. **Review** and merge

---

## 🛠️ Hands-On Exercise #4

### Working with Remotes

```bash
# 1. Check remote status
git remote -v

# 2. Add a remote (if not already added)
git remote add origin YOUR_REPO_URL

# 3. Push your changes
git push -u origin main

# 4. Make a change and push again
echo "Updated README" >> README.md
git add README.md
git commit -m "Update README"
git push
```

---

## Common Git Commands

| Command | Description |
|---------|-------------|
| `git status` | Check working directory status |
| `git add <file>` | Stage changes |
| `git commit -m "message"` | Commit staged changes |
| `git push` | Upload changes to remote |
| `git pull` | Download changes from remote |
| `git branch` | List/create branches |
| `git checkout <branch>` | Switch branches |
| `git merge <branch>` | Merge branches |

---

## Best Practices

--

### Commit Messages

✅ **Good:**
```
Add user authentication feature
Fix login button alignment issue
Update README with installation steps
```

❌ **Bad:**
```
Fixed stuff
WIP
asdfgh
```

--

### Branching Strategy

```
main
├── develop
├── feature/user-auth
├── feature/payment-system
├── hotfix/critical-bug
└── release/v2.0
```

**Rule:** Never commit directly to `main`

---

## Troubleshooting

--

### Common Issues

**Merge Conflicts:**
```bash
# When Git can't automatically merge
git status  # See conflicted files
# Edit files to resolve conflicts
git add resolved-file.txt
git commit -m "Resolve merge conflict"
```

**Undo Last Commit:**
```bash
# Keep changes in working directory
git reset --soft HEAD~1

# Discard changes completely  
git reset --hard HEAD~1
```

---

## 🛠️ Final Exercise

### Complete Workflow

1. Create a new branch `workshop-complete`
2. Add your name to a `participants.md` file
3. Commit the change
4. Push the branch
5. Create a pull request (if using GitHub)
6. Merge back to main

```bash
git checkout -b workshop-complete
echo "Your Name" >> participants.md
git add participants.md
git commit -m "Add participant name"
git push -u origin workshop-complete
```

---

## Resources

- 📖 [Official Git Documentation](https://git-scm.com/doc)
- 🎮 [Learn Git Branching (Interactive)](https://learngitbranching.js.org/)
- 📚 [Pro Git Book (Free)](https://git-scm.com/book)
- 🛠️ [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

## Q&A Session

**Questions?**

🎉 **Congratulations!** You've completed the Git workshop!

### Next Steps:
- Practice with your own projects
- Explore advanced Git features
- Join the Git community

Note:
Encourage participants to ask questions and share their experiences. Remind them that Git has a learning curve but becomes invaluable with practice.