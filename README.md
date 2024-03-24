<< To run the program >>

Go to the folder "CatRancher-test" and install all dependencies with the following command: npm i
Then run the following command to initialize the application: npm run dev

cd "CatRancher-test"
npm install
npm run dev

---

---

---

The Catrancher

Here at #########, we like our cats. We've got so many cats, that we had to hire a cat rancher to take
care of all of them. One of the rancher's main jobs is to separate the cats into groups of 3 cats (a clowder)
that get along. In order to avoid cat fights in the clowder, each cat in the group must either be the same or
different from every cat in the group for each attribute.

Cats
Each cat will have 4 attributes (cattributes if you will) that make it unique.
The cattributes and their
possible values are:
● Stripes: 1, 2, 3
● Color: black (b), white (w), grey (t)
● Shape: tall (t), short (s), round (r)
● Eyes: green (g), blue (b), red (r)

Three tall cats will get along; a tall, a short, and a round cat will get along; but if you put two tall cats and
one short cat in clowder, there will be cat fights.

This rule applies for each cattribute individually.

Valid clowders: 1ttg 2wsb 3brr, 2tsg 2wsb 2bsr, 3ttg 2wsb 1brr
Invalid clowders: 1ttg 1wsb 3brr, 1tsg 1wsb 2bsr, 1tsg 1wsb 1bsg

The cats in the clowder must get along.

Setup the View

Select and Validate Clowders
Once the screen has been set up, provide the user a way for them to select 3 cats to form a clowder.
When the user selects a cat, the user should also have the ability to unselect a cat.

Once the user has selected a clowder (a group of 3 cats), a function should
provide a response to tell you whether the one selected is a valid clowder.

Feedback

If the clowder is valid, display the clowder on the right.
Otherwise, give the user some feedback. Note: The same cat can be a part of multiple clowders.

Also, prevent the user from selecting a clowder that has the same 3 cats that have already been used to
form a valid clowder.
