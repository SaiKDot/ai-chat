## Running the apps

From the repository root, run:

```bash
./start-dev.sh
```

The script starts the Python entry point and the Next.js development server as
separate child processes. Next.js is available at
[http://localhost:3000](http://localhost:3000). Stop both processes with
Ctrl+C.

The current Python entry point only prints a greeting and exits; it does not
yet run an HTTP API server.