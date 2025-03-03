async function runCommand(command) {
    const process = Deno.run({
        cmd: command.split(" "),
    });
    const status = await process.status();
    if (!status.success) {
        console.error(`Command failed: ${command}`);
        Deno.exit(status.code);
    }
}

async function buildCSS() {
    console.log("Building CSS with PostCSS using Deno...");

    // Autoprefixing
    await runCommand(
        "postcss --use autoprefixer postcss-pxtorem --no-map --output css/kascade.css src/kascade.css"
    );
    console.log("Autoprefixing complete.");

    // Minifying
    await runCommand(
        "postcss --use cssnano --no-map -o css/kascade.min.css src/kascade.css"
    );
    console.log("Minification complete.");
    console.log("CSS build finished.");
}

buildCSS();