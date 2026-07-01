# More Of A Rant Than Anything

## Claude Code
- i tried claude code for the first time
- initially, I thought what most people think, I would guess, "wow, this is unreal.. it just knows"
- i quickly came to the realization that my once 'great idea' that i was seemingly co-implementing with claude code turned from a desire to create something genuinely cool to a souless prompting and checking session
- i told myself that i would be different and actually understand what code was being changed and why, prompting for explanation every time, determined not to add the AI slop of the world
- two things occurred to me
- the first is that claude code will get the prompt done by any means necessary, even if that's at the sacrifice of simplicity, understanding, or cohesion to the overall project
- for example, after thoroughly describing the project, claude's first suggestion was to use electron (using chromium browser engine), which makes sense, but is way overkill for the project, this was subsequently followed by much more questioning and followup simplification that was most often met with "you're right to push back", as if claude just wanted to get it done and just took the average of all it knows and spat out whatever made sense in scope (unsurprisingly, that's what llms are supposed to do)
- the second realization was that big overarching prompts that modify a lot of code just destroys the project
- so many little decisions are made that you're giving the keys over to claude code completely, it runs the project now
- the only way to take it back is to prompt through the whole code base it created and ask it to explain every decision and line of code it made, but at that point, why even have claude code anyways
- you end up in a situation where you want to use this amazing tool, but then are subject to it why it performs what it thinks you want, no matter how detailed or accurately you describe what you want it to do, it just isn't exactly right, and this only compounds with the amount of code that one prompt is asking to change
- the result is a project that you have relinquished control over to claude code and struggle to find any identity or connection with
- in the end, this project went from a cool idea that I would love to implement to just finish it claude code to whatever presentable level and be done with it
- to put it plainly, claude code became the bus driver, and I was just a passenger not really enjoying the ride
- i felt like a human wrapper for the llm

## Lessons
- i learned that I cannot rely on claude code if I want any chance of learning anything
- the common pushback is "you don't need to learn anything really, just overarching design, and let claude handle the rest" - completely disagree
- you lose scope on what you are trying to create when you can't interpret the code that gets spewed out
- there were so many "you're right to push back" and the project code ended up being simpler and better performing simply because I noted a changed and questions claude on it.. how many of those changes have I not noticed
- ai assistants need to be just that, assistants
- if I can't write the code on my own, I shouldn't be using an llm to do it for me
- i need to understand myself, because at the end of the day, if idea is mine, the implementation should be mine, and the project and the code therein will be responsible by me
- trying to learn after the code was already produced.. isn't learning
- i skip to whole failing and frustration process that produces learned experiences
- the only use for learning I can see is to have the llm spell it's steps out for you before giving it the go ahead, but at that point, might as well just find a resource for correct structured understanding anyway

# New Approach To Projects

## The Learning Process
- i will be transitioning to a relatively ai free learning process do get projects done
- this will require a considerable increase in time commitment, because I intend to know how to implement every part of what I code
- seems self explanatory, except at this point, it needs to be stated
- learning will consist of the usual -> docs, videos, courses, books, etc.
- once I feel I have a full grasp of how to implement the project, I will begin to code

## Claude As An Assistant
- the only time I will use ai for coding my project from henceforth will be for monotonous and recurring tasks that have no cerebral activity to them
- things like moving large quantities of files over from one folder to another and respecifying everywhere in the project that needs to be changed as a result
- things like autocomplete that come stock with vscode will need to be turned off.. because I want to make mistakes, I want to fix them myself, I want the code I produce to be produced by me
- this is less of a selfish thing and more of a it has to be this way because at some point in a project's growth, if you don't have the scope and understanding in your head for what every file and functions does, then you can't point your project in the correct direction, you're just at the mercy of the llm's minute compounding decisions

# Future Goals With This Project

## The Reality
- the reality is that this project is incomplete and just not very good
- most of the enthusiasm with the project got shipped away with every llm call I made, specifically with every line of code the llm contributed
- kind of like the idea wasn't mine anymore and something else wrote it and I was just saying yes and no
- most parts of the project are jankly put together and not very well thought out
- i made many implementation decisions changes such as python -> c++, electron -> win32, and others that would bring the project size down because I inherently know that a project of this size should not be half a gig

## Features
- there are many features I wish to include in the future
- some features include a setting hub, music detection, cloud api options, and many more
- the settings hub would include things like, frequency of api calls, token limits, bird personality presets, bird size, etc.
- another feature was backlighting the bird based on the background it was flying in front of
- i don't know, the whole idea was to make a bird that felt alive and grew with you with the power of llms, but to truly make that a reality, the conclusion was dynamic animation generation, which is not possible from my current understanding
- towards the end of the project, I realized I burnt out before I even really began
- i will come back to this project and remake it from the ground up, my way
- eventually, I would like to add more companions, other than just the bird

## Animations
- the bird animation pipeline was also quite rudimentary
- i used Midjourney to create the character I had in my head and iterated through positions the birds would be in
- i then used Midjourney's animation tool to create an animation from the first default frame to the last desired frame
- this resulted in animations that are.. not the best
- ideally, I would hire an animator to create professional animations to use which would make the experience significantly better
- i even had the idea early on to learn OpenGL, but quickly ran into the problem of how complex OpenGL would be to learn from scratch and that the quality of bird I was going for was not quite a possibility