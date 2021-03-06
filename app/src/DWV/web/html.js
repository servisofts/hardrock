export const html = () => `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>

<body>
    <div>
        <script>
            const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({ 'type': 'Console', 'data': { 'type': type, 'log': log } }));
            const console = {
                log: (log) => consoleLog('log', log),
                debug: (log) => consoleLog('debug', log),
                info: (log) => consoleLog('info', log),
                warn: (log) => consoleLog('warn', log),
                error: (log) => consoleLog('error', log),
            };
        </script>
        <div id="root"></div>
    </div>
</body>

</html>`