# Dependencies.

MongoDB,
SBT,
Scala.

# Dependencies to install dependencies in Mac.

Homebrew,
xCode

* How to install xCode: 

- Open **App Store** 
- Search for xCode
- Click Install 
- Wait until done. 

- **Terminal mode:** 

xcode-select --install

* How to install Homebrew: 

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

* How to install MongoDB, SBT and Scala. 

- brew Install mongo
- brew install scala
- brew install sbt


# Running the app: 

** Run mongo as daemon **

mongod --config /usr/local/etc/mongod.conf


** Execute the app **

- In intellij: 

Click green arrow with IntelliJ

- In terminal: 

sbt run (Remember, you have to be in root folder)

Example of a list of To-do's api with scala and akka http
To execute run sbt update on root directory and then open the project with intelliJ
