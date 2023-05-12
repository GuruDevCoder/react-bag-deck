so actually do have a lot to talk about
so I'm going to dive right into it hi my
name is Andrew Clark a CD light on
Twitter and on github so yesterday a
pretty big day
pretty good days everyone liked it it's
a biased crowd so yeah we unveiled hooks
pretty exciting I'm very excited about
it sounds like all of you are very
excited about it new and improved way to
build react components better than
probably most of us could have imagined
yeah really pumped what I really love
about hooks is that it empowers
developers to spend less time thinking
about their code and say you know less
time arguing about higher-order
components versus render props perhaps
and more time focused on the best
possible user experience and this is
really what React is all about it it's
about making it really easy for
developers to create America amazing and
American amazing experiences I mean
maybe American we're going to continue
this theme today making it really easy
for developers to create amazing
experiences for users so we can't talk
about user experience unless we talk
about performance because of course
performance is integral to UX but it's
often quite hard to make our apps fast
without occasionally compromising the
user experience in some other ways let
me let me give you an example of what I
mean so who knows what code splitting is
right okay you didn't have to actually
raise your hand so that's where instead
of sending all of the code for the whole
app in the initial payload we send down
what's needed to render the first screen
and then we defer the rest to later
perhaps lazily loading it as we make
subsequent navigations so this makes a
lot of sense and it seems like most of
you many of you in the audience they're
already code splitting your app but once
you start code splitting parts of UI you
pretty much instantly face a problem
which is what do you display to the user
if the view that they're trying to look
at
finish loading you got a lot of options
probably something like this or maybe
you know spinner a loader a placeholder
whatever you want to call it it's a
thing that you show instead of the real
thing for as long as it takes for the
real thing to finish loading so there's
nothing inherently wrong with spinners
and for users on slow networks they
provide valuable visual feedback and
improve the UX but if you show a spinner
unnecessarily if you show a spinner for
like a split second or you know two
frames if you show many spinners right
next to each other they start to do the
opposite and they start to degrade the
user experience so I have this game I
like to play it's really fun it's called
count the placeholders it's really easy
to play you go to any website and I mean
literally any website most apps as well
and you just count how many times that
something pops onto the screen or pops
into place before it finishes loading so
I'm gonna show you a screen from a
Facebook app I did not contrived this is
an actual screen I didn't like have to
go hunting around for it it's just
something people see all the time
and let's play count the placeholders
did anyone count did you get a count
oh shoot let's go back
I don't know I think it's more than for
whoever said four is wrong also this is
three seconds of time and I have done
the frame-by-frame thing and there's
like at least 20 it's it's ridiculous
here's the thing the people who made
this app and they're not incompetent
right there's some of the smartest best
UI developers in the world it's not for
lack of attention that these types of
problems happen when you have a large
app worked on by many people perhaps
over my perhaps over many years it can
be incredibly difficult to manage these
types of problems at scale so what this
is just one example but what if we could
have it all what if we could find a way
to build apps that are high-performance
by default with smooth non janky user
experience all via api's that are really
intuitive to developers so it's just you
don't have to think about doing the
right thing it's just the thing you
would have done anyway because it's the
obvious thing right I was supposed to be
clicking through these things as I
talked but all of that so we think we
have a way to address this type of
problem and it's called concurrent react
now if you're confused because you've
heard of something called async react
before we had a naming workshop and we
decided that the name of the term async
is a very broad term that describes many
things
and while concurrent react does in fact
can compass many capabilities we think
the word concurrent properly emphasizes
the part that makes it special so let me
explain what I mean when I say

concurrent

so concurrent react can work
on multiple tasks at a time and switch
between them using cooperative
multitasking according to their priority
concurrently

I can also do something
else says it can partially render a tree
without committing the results to the
Dom so for example react can start
rendering an update and if it hits a
component that hasn't finished loading
for instance reacting wait for it to
complete before it continues and it
doesn't immediately have to show a
fallback or a spinner or a placeholder
or nothing right and also concurrent
react crucially it does not block
main thread

to give a little
visualization of what I mean by this
let's compare it to how we react works
today so today react is synchronous
which means when you update a component
react is gonna synchronously process
that update it's gonna do all of the
work to finish the update in a single
uninterrupted block on the main thread
right so the problem of course is that
if the user is that user events also
fire on the main thread so if you're
chugging along rendering an updates and
in the meantime the user tries to type
into an input in synchronous react that
input event can't be processed until
after the currently executing render has
completed so like all the way past the
blue write and

concurrent react however
react is going to pause the current
render it's going to switch to complete
the user blocking task and it's going to
resume afterwards on the original stuff
we sometimes also refer to this as time
slicing and that's the ability to split
work into chunks and spread its
execution over time blah blah blah the
key thing to take away is that
concurrent react is non-blocking so you
can render large amounts of work without
blocking user inputs or other high
priority tasks on the main thread
crucially like at a high level though
setting aside all of that technical
mumbo-jumbo concurrent reactive designed
to solve real world problems faced
commonly by UI developers like you

we've
made it we've worked really hard to make
concurrent react easy to adopt in your
existing components no rewrites right it
goes great with hooks in fact hooks were
designed from the beginning to be
compatible and work really well with
concurrent react but it also supports
class components too so I want to
illustrate these things to you by diving
into a demo

so what I'm gonna show you
in this demo is how you can have really
really easy code splitting of components
with a thing called lazy an API called

lazy I'm gonna show you how you we can
avoid that terrible janky spinner
problem with react suspense in
conjunction with reacting with
concurrent react

I'm going to show you how you can do
very simple data fetching with a
experimental package called react cache
and then I'm going to show you how you
can pre render some might say
speculatively render content off screen
so that perhaps it's available by the
time the user needs it

so let's just
dive right in so I'm going to exit this
and I'm going to oh I want to there we
go you want to see that actually I'm
going to disable that real quick all
right so

I have this app I'm continuing
the Mary Poppins theme from yesterday
both because I like the movie Mary
Poppins and just for continuity sake you
know so I have this this little tiny app
pretty simple just shows information
about the 1964 hit classic Mary Poppins
and if I switch tabs you know there's
there's this tab that has information
about my favorite songs from this great
movie and go here if that just some
reviews with some grouse spinners and I
can just kind of switch between these
tabs and do stuff so I'm really proud of
this app I worked really hard on it
my manager comes to me I have a manager
my manager comes to me and tells me that
I really need to be careful about all
the features that I'm adding to this
highly dynamic app and make sure that
I'm being responsible with my code
budgets right so that stats tab with the
really complex visualization I need to
make sure I'm dynamically importing that

I need me to make sure that's not
slowing down the initial render of the
very crucial poster thing so I'm gonna
show you how you can dynamically import
or code split a react component using a
new API called lazy

so here's my chart
component again that's the thing that
shows up on this stats page right here
if you look down here it's just rendered
inside of this tab content thing that I
have so I want to change this to be
dinah are lazily loaded so I'm going to
come up to it's important to comment it
out and I'm going to instead use the
lazy API so I get lazy from it's a named
import from Rance
it's gonna be called shart equals lazy
so lazy except a single argument I can't
make it stop doing that I tried I set up
a single argument that returns a dynamic
import go away please and that's it
if you use webpack or have use webpack
this probably looks a little familiar to
you just dynamic import and we return it
from our function that we passed the
lazy I'm gonna delete that and that's
really it so the idea is that a
component that you lazily import has the
exacts you use it the exact same way as
you use the static import so all I had
to do is change that one line and they
come down here you look at the render
method and nothing else is different
right so I'm gonna save it and let's see
what happens when I go to this stats tab
oh no I did something okay let's see the
error message an update was suspended
but no place order holder you I was
provided okay I know what happened so
because I contrived this so in suspense
what happens if if we act starts
rendering and it hits a component that
isn't quite ready to render yet then
react needs to render a fallback in its
place and the way it does that is very
similar to an error boundary if you're
familiar with those I mean should be
they're very cool or a try-catch in
JavaScript or some other language so the
way it works is this is the component
that's suspended right or start lazy
chart component reactors gonna look
through all the parents in the ancestor
path and try and find something up
called a suspense component now just
think of a suspense component kind of
like an error bound during this context
it's just gonna give tell react what it
can render in place of the thing that's
suspended so I'm gonna import a suspense
component from react I like to just at
the beginning of when I'm starting a
project just kind of put one at the very
top you know just in case
hopefully most things don't get all
way up here I'm just gonna wrap the
whole app and a spinner and then I'm
gonna come down here and change the
closing tag and then I'm gonna import a
spinner save okay so this time when I
click this tab hopefully I don't get
that horrible error dialog and I'm gonna
see a spinner and then whenever the
module is finished loading its gonna
switch to the actual content so I'm
gonna click on stats sauce spinner and I
finished loading okay there we go so
that's pretty cool all I had to do was
change a single line then I wrapped my
whole app in this suspense component
which really you only have to do that
once and now I have a lazily loaded
second tab okay let's be honest that was
not the greatest user experience right
there that we just saw when I switched
to this desk tab the whole screen kind
of goes away in this replaced by spinner
and that's because react had to search
all the way up to the top to this very
top level suspense component to figure
out how to fall back to something a
commander without suspending the next
thing is I can put as many of these
things in in my tree as I want so I
think I want to instead of hiding the
entire app I want to just hide the chart
so I'm going to add another suspense
component right here again these are
just like Arab boundaries or like try
catches again and I render spinner sorry
Oh bigger yes absolutely if I can drag
this can you see that okay thank you
I'm gonna do a closing suspense tag I've
done that literally every time I first
this okay thank you
missing I hate JSX uh sup pence that's
close enough
what is this closing tabs good Tex good
for anyway so now when I click the stats
tab instead of the entire screen hiding
it should only hide the chart so let's
see what happens hopefully that's what
happens okay there we go so now this
instead of Mary Poppins and the entire
boxy thing going away it was just what I
raps the chart with and then let's say I
changed my mind I actually want to hide
this little header thing that's
delivering so much information unhide it
until the chart loads as well make that
change okay there so the point of this
exercise is just to show you that you
can have very precise control over
exactly where you're loading steak dos
another thing I want to mention is I am
still in synchronous mode I have not
done anything to enter the concurrent
world yet this is all running in
synchronous mode there's some class
components sprinkled around in here this
is to show you that you can start on
Monday importing you know lazy and
suspense and start code splitting your
stuff and and realistically as exciting
as suspense and current mode is it's
probably will be the the first thing the
first kind of taste you get of this new
programming model that's really exciting
and react so that's really cool but I
don't want to stay in sticking mode for
this entire demo because that'd be very
boring so I want to well first I want to
show you something so I have this thing
done here which is I can switch to a
fast Network this just simulates what it
would be like if I were on a faster
network connection so this time when I
click the stats tab let's watch what
happens
it's gonna lazily load the component and
show spinner right that time I showed a
spinner for like like we're almost
nothing look at that again yeah that
spinner was useless right it'd be really
nice to free I could do the thing we
were mentioning earlier where we wait a
little bit longer
if it look comes if it resolves within a
certain threshold we just don't show the
spinner at all we just pretend like it
didn't even happen so I can do that if I
switch to concurrent mode so I'm gonna
go back to the slow Network actually now
I'll stay on the fast Network refresh
I'm gonna hide my sync app and I'm going
to load okay so now this is the same
exact app same exact code that we've
been you know ed of editing here I've
just changed the color to make it a
little bit easier for you to distinguish
but now we're running in concurrent mode
only difference only difference is
concurrent mode I can make any other
changes to to the implementation of my
components okay so look what happens now
when I click on the stats app again same
thing I have a lazy component when I was
in sync mode it was showing a spinner
but now when I'm a concurrent mode no
spinner no flash it almost just seemed
instant you can't even tell that that
was lazy right because it just happens
like fast enough that it's pretty good
okay so I don't want this to be too
overwhelming but I am gonna show you a
side-by-side cuz like I kind of like
this side-by-side tell me if it's too
confusing though so I'm gonna click on
stats and it's gonna do the navigation
on both in both the sink version and the
concurrent version so just I know it's
overwhelming but just try and see what
happens and compare the two experiences
just click on stats there you see that
so on the sync mode side it flashed the
spinner but on the concurrent mode side
it just you know waited a little bit
longer the final result is exactly the
same they both appeared on the screen at
the same time but one was a much
smoother nicer experience I'll show you
one more time quick stats boom there you
go so in a fast Network I think this is
a lot better if we can just avoid
showing these unnecessary flashes of
spinners we create a nice a lot smoother
experience okay so this is on a fast
Network let's switch to a slow Network
and do the same thing I'm gonna click
stats okay now we're getting into the
area where maybe no I think it's still
okay to not show a spinner on the
concurrent mode side let's watch that
one more time
you see it took a little bit longer so
suspense also gives the ability to
configure the exact threshold that
you're willing to wait for before you
you would really prefer it to fall back
to the spinner I'm not going to get into
that because I have a lot of stuff to
cover but Jared Palmer will be giving a
talk shortly after Bryan's where he will
go a lot more into depth in some of
these api's one thing I can do though is
let's focus just in concurrent mode
again so notice when I click stats it
kind of feels like the UI froze right
until the until the tab switch let's do
that one more time so I click yes feels
very laggy I don't like it so one of the
things I can do aside from maybe showing
the spinner
after all is what it wouldn't it be cool
if I could immediately switch the
highlighted tab so immediately switch
the tab that is filled in green even if
it takes a little bit longer for the
actual constants to switch I think that
wouldn't give it a little bit nicer of a
user experience and make it feel like
the app was really responding to my
input so I'm gonna show you exactly how
to do that I'm gonna go to the tabs file
okay so I'm using hooks here cuz hooks
are awesome but you can use classes as
well thank you Jim
so I have two updates here I have an
update that does set highlighted tab
that's the thing that sets the green tab
I have another update that actually does
the switch to show which thing is
visible which tab content is visible and
then I have this other thing called
defer I can't go too in depth as to what
defer is but I got it from this
scheduler package this is another
experiment experimental package that
we're working on we're cooperating a
little bit with the browsers and some of
some other people in the wider ecosystem
on this kind of main thread scheduling
space we'll have more to say about this
maybe in a few weeks or months for now
all you need to know is that if I wrap
an update so these two updates here in a
defer call that's a hint to react that
it's okay if
these the rendering for these updates
takes a little bit longer I don't need
to show the fall back immediately I can
wait a little bit longer before I fall
back but what we decided in this case is
I actually do want to show the tile and
it highlighted tab immediately I don't
want to really wait so what I'm gonna do
is I'm gonna move set highlighted tab
outside of the defer call and now we're
just directly inside this user event
handler
I'm gonna save only one line change I'm
in so now when I click on the stats what
I expect to happen is the stats tab will
immediately turn green and then a little
bit later the content will change see
that one more time immediately turns
green and a little bit later the content
changes so all I had to do was tell
react which update I'm willing to wait a
little bit longer for and which what
date I really would like to happen now
so cool okay so last tab I want to show
you is the reviews tab so I gave you
kind of a peek of the situation going on
here I think most of us can agree that
we don't need three spinners at most we
need one maybe if we had a giant list
it'd be a little bit different but
there's only three here so and they've
all come in at about the same time let's
see if we can make this experience a
little less janky by coordinating the
spinners using suspense so let's go over
to the review module okay so now I'm
kind of getting the picture for why this
is happening my reviews component is
implemented using life cycles and local
state it's a very common idiom and react
to store your data in local state and to
update it with life cycles so you see
initializing my state to no unmount an
update and doing the dipping thing that
Ryan was talking about and I'm fetching
using this fetch API thing and I call
set state and blah-blah-blah-blah-blah
in the render method there's this if
statement and this is kind of the crux
of the problem here right is every
single component that loads data this
way have to account for this case where
the data hasn't loaded yet so all three
of these components for each one there
is an if statement and for each one
there is the possibility that they might
render a spinner and that's how you get
all of those
sibling spinners like in the in the the
video I showed you earlier when we were
playing that fun game count the
placeholders so the really nice thing
about suspense is you can treat data
asynchronous data over a network as if
it were just synchronous data from
memory it sounds too good to be true but
that's really the developer experience
that it gives you so I'm going to show
you how this works
I'm gonna import from another
experimental package called react cache
it has a method called create resource
react casa can't cache again is a it's
an experimental package we don't
recommend you use it in production
it's the API will change but the plan
for this package is that it will provide
a nice reference implementation for
other frameworks like relay and for
Apollo and whatever your favorite data
framework of choice is they can be
inspired by the patterns that are used
in react cache and implement them
themselves and then if you're already
using one of these frameworks you're
just gonna get nice dispense features
for free but for now we're just going to
import from crack cache I'm gonna create
something called an api resource i'm
gonna call this function create resource
it accepts a function that takes a key
in my case it's going to be a path and
then you're supposed to return a promise
for the data that you want to read so
I'm going to call the same fetch API
method that I called in my class o that
JP pi
I'm just gonna pass pass the path
directly to it and the way I use my API
resource again it's just as if you're
reading from local memory so I'm gonna
comment out this line say data equals
API resource there's a single method
read I pass it a path in this case it's
read from this prompts teen save so what
happens right now I'm expecting it
should just work there you go
so I had to change so few things to note
again the thing I received from API
resource that's never not going to be
the thing I asked for it's never gonna
be known so I actually can delete this
line right here because that's just note
that states just never gonna happen we
don't have to manually check for loading
States everywhere and all of our
components anymore we just rely on
suspense to find the nearest suspense
component and fall back at the
appropriate boundary level I get rid of
this line now too
I'm not using the local state so I can
get rid of the constructor and this is I
don't need any of this no sir I'll get
rid of that why is this a class no one
cares about classes anymore
it's October 26 that's the day old yeah
what did I call it reviews okay there
you go
by the way classes classes are still
fine I don't want to i don't know rag on
classes too much but it did feel really
good to delete it right now okay so now
I've shown you how to I don't know do
you like this code and fourth in the
class I'm just just curious I think it's
a little bit better okay my apologies
again for the for the class people in
the audience whoever you are okay so
I've shown you a few things again fast
network slow Network there were a
concurrent mode hopefully the difference
between sync mode and concurrent mode is
kind of sunk in again same API is if I
go back to sync mode same API still
works for synchronous mode oh nope that
time it didn't this step props Tallulah
well that's probably a react bug so it's
also my fault
oh no it's not my fault or it is but
that was gonna not be fun I love y'all
when y'all fix my books there we go so
the same API still works in synchronous
mode it just is a little bit worse of a
user experience but arguably probably
not any worse than what we're already
doing with our older patterns okay so I
want to show you one last thing and that
is you know when I load my little Mary
Poppins app with all my useful
information
the reason I've started deferring the
loading of resources so that it doesn't
slow down this first tab right but
typically you know someone visits this
first tab they're gonna spend a few
minutes reading this really interesting
summary they might not the click on the
second or third tabs for I don't know
maybe a second maybe two seconds
wouldn't it be really great if while
there you know biding their time not
clicking on any other further
navigations in the background perhaps
they're very very very low priority so
it doesn't block anything else in the
main thread of course we could start
pre-rendering and pre loading those
other tabs that's exactly what we're
going to do so I'm gonna go to my app
component again and so you see this tab
content thing so I have a boolean in
here and it says right now it says if
the tie or the if the content for this
tab is not visible or should not be
visible just render nothing into this
diff right but if it is this visible
render the children so that's what
allows me to switch between these three
tabs so I'm gonna make a tweak to this
and instead of rendering nothing when
the tab is hidden I'm I'm gonna still
render the children but I'm going to
pass a hidden prop to div so this is a
normal html5 attribute hidden it just
hides the content react also gives it
uses a special heuristic where if it
sees one of these hidden props it's
going to automatically deprioritize all
of the children so that they get that
really really low up we call off-screen
priority

that way what you can do is when there's
nothing else to do on the page you can
start rendering and loading the other
tabs but it's not going to steal
resources from the things that are
actually on the screen so I'm going to
save this let's go back to current mode
for a second refresh ok so the only
change I've made since last time is I
switched from null to rendering the
children and into a hidden div so I
click reviews it should just be there
right yeah it was just there
[Applause]
I can probably beat it though so if I
click really quickly it's like yeah see
like you know it still suspends if I do
it immediately but you know people are
gonna read this great paragraph here so
they're gonna wait a little while and
then they're gonna click it and it's
gonna be immediate so pretty good right
we can't get any faster than already
there so those are all the things I
wanted to show you I have a few more
slides
let me just tab back to keynote
okay so concurrent reacts let's sum up
what I've talked about here today so the
two marquee features have concurrent
react are time slicing and suspense in
time slicing you get rendering that is
non-blocking
which means it yields to use your input
you can coordinate multiple updates to
different priorities so that's like the
the tabbed thing that I was showing you
where we could update the highlight
before we actually switch the tab
contents and we have the ability like
the last example to pre render content
in the background crucially without
slowing down the visible content on the
screen if we did this in synchronous
mode you'd basically just it'd be the
same thing as if you were just you know
synchronously rendering all the content
on the entire page so that's no good
it's the fact that it's not blocking
that allows us to and the fact that it's
low priority allows us to do this
without you know having problems other
key feature or a marquee feature of
concurrent reactive suspense means you
can access async data from the server
just as easily as you would access sync
data from memory you can pause a
component render without blocking any of
the siblings
and you can precisely control the
loading States to reduce the jank so
when can you start using these things so
16-6 is already out so you know that
left side of the screen that was all the
you know the synchronous version of the
Mary Poppins app everything I did in
there you can do today is released two
days ago that includes lazy and includes
suspense the hooks alpha that we
published yesterday 16.7 also includes
concurrent mode we're hoping to get that
out hopefully by the end of the year
don't quote me
that even though in front of everybody
and then react cash and scheduler those
are the two experimental packages I
showed you those are pretty important
packages we think especially scheduler
they're not quite ready yet the api's
will probably radically change but we're
hoping to get those out to you soon
we've been quite busy lately as you
might imagine
so that's concurrent reax next I want to
invite up Brian who's going to show you
in this new concurrent async multiple
priorities world how are we going to
gain insight into the performance of our
components so Brian's going to talk to
you about that right now hi I'm Brian
and I'm on the react core team today I'm
going to talk about some new profiling
tools that we've added to react in
general asynchronous code can be hard to
reason about this isn't react specific
but we want the developer experience for
our new concurrent rendering mode to be
great so we've created two tools to help
with this a dev tools profiler plugin
and a new profiling API if you're
running a profiling capable version of
react meaning version 16 5 or newer
you'll see a new profiler tab in dev
tools to profile an application select
this tab and click the record button
then use your app like normal when
you're done profiling click stop the
profiler will now show you information
about your apps rendering performance
there's a couple of things I'd like to
highlight at the top there's a selector
that shows a bar for each time your app
committed changes to the Dom or the
native environment I'm going to refer to
each of these bars as a commit the size
and color of each bar is determined by
the amount of time spent in rendering
that commits the currently selected
commit is colored black in this
screenshot our app committed three
updates and we're currently viewing the
third one the right-hand panel shows
information about the selected commit in
this case it shows that our app spent
about 12 milliseconds rendering the main
panel shows a flame graph that
represents what your app rendered each
node in the graph is one of your react
components the color is a gradient that
represents which components took the
longest to render and a particular
commit brighter yellow components took
longer than blue green ones gray
components were visible on the screen
but didn't actually render during the
current commit in other words react
reused their response from a previous
render for now don't worry about the
width of these nodes we explain how
that's measured on the react blog if
you're curious the profiler also has a
ranked chart this shows all of the
components that render during the
selected commit sorted with the slower
ones at the top if your app is slow this
chart may give an idea of which
components you should focus on
optimizing and that's enough to get us
started you can find more information
about the profiler on the react.js blog
if you're interested in the next few
minutes we're gonna use the profiler to
measure and improve the performance of a
react type-ahead component before we
start here's a demo of the component
will be profiling this component
displays a list of github users and lets
you select how many users it should show
let's look at the code the outermost
component is called type-ahead its
accept a user's prop which is an array
of github users and it has two pieces of
state the first is the search tax since
type-ahead is a function component we
use the new use state hook for this we
use another use state hook to control
how many results the type-ahead shows by
default we show the first five matches
then we filter the incoming array of
users to find people whose names begin
with our search text and lastly we
return our markup we also have a list
item component it's responsible for
rendering the github user's avatar and
name for the purposes of this demo I
added a hack that makes list item render
slowly to simulate a more expensive
component so let's start by profiling
and see how our type of head performs
we'll begin by searching for users whose
name starts with a and then we'll
increase the number of results shown to
ten looking at the first commit the
profiler shows us that five list items
rendered this is what we'd expect but
looking at the next commit we see that
ten list items rendered this isn't great
because the first five users didn't
actually change between commits so why
did we rerender them list item is a
function component and react always rear
Enders function components even if their
props have
changed until now using the memo helper
that we released in version 16 six we
can tell react to treat our function
component like it would a pure class
component and only rerender it when the
props change let's take another look at
our component after making this change
we'll start by doing the same sequence
as before our first commit still renders
five items as expected but now the
second commit only renders the items
that were added to the end of the list
the first five are no longer re-rendered
thank you so while we were profiling I
noticed that our type-ahead component
seemed a little slow let's take another
look at it specifically we'll start by
searching for the first 15 users whose
names begin with D and then we'll
decrease the count to 10 then 5 looking
at the type-ahead component specifically
we see that for each commit this
component took over 5 milliseconds to
render in fact most of the time spent
rendering the second and third commits
was spent on this component let's look
back at the code for type-ahead
type-ahead filters the array of users
every time a tree renders this is not
necessary we really only need to rerun
our filter function when one of the
inputs change either the users prop or
the search text state we can accomplish
this using a technique known as
memoization to do this we'll use another
one of our newly proposed hooks use memo
use memo accepts a callback function as
its first parameter this function
returns a value in our case of filtered
array and use memo accepts an array of
inputs as the second parameter you can
think of these inputs as dependencies
for the callback function react will
call the function again any time one of
these dependencies changes this is
similar to the use effect hook that Ryan
showed yesterday let's see if that
helped by profiling again we'll start by
doing the same thing we did before
the profiler shows that type-ahead still
took about 5 milliseconds to render
initially but updates are much faster
now that we're memorizing the filter
function
the profiler can help you spot when
components are slow but if you record a
lot of commits it can be hard to tell
what's changing in that particular
commit we've created an API to help with
this - we call it trace and it's part of
our new scheduler package essentially
trace lets you assign a label to a chunk
of JavaScript code and it takes three
parameters a string that describes what
your code is doing the time stamp when
your code was run and a callback
function containing your code trace can
be used to label any JavaScript code
it's not react specific but it can be
used with react let's take another look
at our type I'd component specifically
let's look at the search text state when
the type of head text changes our change
handler calls set search text to update
the component state we can add a label
to the state by wrapping it with the new
trace API let's take another look at the
profile there with some labels added to
our state updates this time we'll search
for users named Brian and we'll change
the number of results shown to 10
the profiler now shows the interactions
we traced for each state update this
makes it really easy for us to tell what
calls the update we can also view a
chronological list of every interaction
that was traced during our profiling
session and we can jump between the
interaction and commit by clicking on
the labels the trace API is now
available in an alpha release you can
learn more about it at FBI me slash
react - interaction - tracing I'll tweet
a link to this afterwards if you don't
have it written down we also release we
also recently released an API for
profiling for recording rendering times
this can be useful if you'd like to log
them somewhere like a server to measure
your apps performance over time this API
comes in the form of a special react
component named profiler you can wrap
this profiler component around other
react components in order to record
commit times for these components for
example here's how we would wrap the
type-ahead component we've built
and here's a quick demo of the profiler
we'll just load the profilers prams to
the console for now in this case I'm
going to type a single letter and then
open the console to look at what was
logged profiler shows that I can point
at render twice once when I mounted and
once when I typed C it also shows us
when the render happened and how long it
took and the second commit also includes
this data update label that we added
earlier the profiler API is available in
react 16 5 and newer and you can learn
more about it at FBI me slash react -
profiling and that's all I have thanks
for listening and I hope you all enjoy
it a second day of the conference
[Applause]
