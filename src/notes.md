https://www.youtube.com/watch?v=ByBPyMBTzM0

# Notes

When you talk about user experience you have to talk about performance.

It's often quite hard to make our apps fast without occasionally compromising the user experience in some ways.

One is Code Splitting

Instead of sending all of the code for the whole app in the initial payload we send down what's needed to render the first screen and then we defer the rest to later perhaps lazily loading it as we make subsequent navigations.

Once you start code splitting parts of UI you pretty much instantly face a problem, which is what do you display to the user if the view that they're trying to look at didn't finish downloading.

You got options, such as spinners. There's nothing inherently wrong with spinners and for users on slow networks they provide valuable visual feedback and improve the UX but if you show a spinner unnecessarily they start to do the opposite and they start to degrade the user experience

When you have a large app worked on by many people perhaps over my perhaps over many years it can be incredibly difficult to manage these types of problems at scale so what this is just one example

What if we could find a way to build apps that are high-performance by default with smooth non-janky user experience all via APIs that are really intuitive to developers so you don't have to think about doing the right thing it's just the thing you would have done anyway because it's the obvious thing.

The way to address this type of problem is called Concurrent React (former Async React).

> Concurrent React can work on multiple tasks at a time, and switch between them **according to priority**.

react can work
on multiple tasks at a time and switch
between them using cooperative
multitasking according to their priority

Also

> Concurrent React can partially render a tree **without committing the result (to the DOM)**

react can start
rendering an update and if it hits a
component that hasn't finished loading
for instance reacting wait for it to
complete before it continues and it
doesn't immediately have to show a
fallback or a spinner or a placeholder

Most importantly

> Concurrent React **does not block the main thread**

## How React works today, synchronous React.

today react is synchronous
which means when you update a component
react is gonna synchronously process
that update it's gonna do all of the
work to finish the update in a single
uninterrupted block on the main thread

the problem of course is that
if the user is that user events also
fire on the main thread so if you're
chugging along rendering an updates and
in the meantime the user tries to type
into an input in synchronous react that
input event can't be processed until
after the currently executing render has
completed

With concurrent react however
react is going to pause the current
render it's going to switch to complete
the user blocking task and it's going to
resume afterwards on the original stuff
we sometimes also refer to this as time
slicing and that's the ability to split
work into chunks and spread its
execution over time

concurrent react is non-blocking so you
can render large amounts of work without
blocking user inputs or other high
priority tasks on the main thread

- easy to adopt in your existing components
- great with hooks
- supports class components

### Demo

- Code-splitting with **lazy()**
- Avoiding Spinners with **Suspence** (and Concurrent React)
- Data fetching with (experimental) **React cache**
- Prerendering (speculatively render) **offscreen content**
