#!/usr/bin/env node

export default class CLI {
    start() {
        console.log('cli started')
        console.log('')
        console.log("Line 1")
        console.log("Line 2")
        console.log("Line 3")

        setTimeout(() => {    
            process.stdout.write("\x1B[2A")
            process.stdout.write("\x1B[K")
            process.stdout.write("Updated Line 2")
            process.stdout.write("\x1B[3B")
        }, 1000)

        setTimeout(() => {
            console.log("\nThis is a new line after updates.");
        }, 1500)
    }
}