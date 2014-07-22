![picosec logo](/logo/logo-text.jpg)




# Picosec documents

This repository contains documents (specifications, reference docs and other discussions relating to the Picosec (formerly MXD) project.

## Structure
Currently we have the following top-level sections:


### [Scope definition](scope/)
These are formal statements of scope. (draft and subject to change)

### [Landscape and State of the Art](landscape/)
This should include links to articles, analysis thereof. Indeed any background work that is generally useful to our objectives.

Any useful links and discussion documents can also go here 


### [Security](security/)
Formally this should include threat model and security analysis



### [Requirements and Specifications](specs/)
Requirements and formal specifications

(note this section uses a custom tool chain that will not render correctly in github in its entirety




## How to use

### Editing content



Clone this repo and work from a local copy. Push your changes regularly.

All work will be in master unless we later decide otherwise.

#### Tools
The following tools may be useful for editing and previewing content (if you dont want to do it by hand)

**github** if you are logged into GitHub, you can both view and edit content directly from here. This is probably the easiest method.

**dillinger** web based markdown editor. Can save directly to github by linking with your github account. http://dillinger.io/

**stackedit** chrome application. Similar to dillinger https://stackedit.io/

**markdownpad** windows application. Good for offline content. http://markdownpad.com/ 

**custom tools**  note ivan is working on a tool chain to help the production of printable specs. Will include
* PlantUML 
* GraphViz
* Widl processor
* page concatonnation  

if there are request for other 

### Vieiwing content

**locally** A number of systems can be used to serve HTML from the markdown here. One example is [mdserv](https://github.com/Bonuspunkt/mdserv) which seems to work with any recent node version.


**online** the wiki is currently hosted on picosec.org:8080. The content is extracted every hour as a chronjob from the github source material

**gdrive** the content is also synchronised with picosec-files/picosec-docs gdrive file which has been shared with project members

**github** the content can be viewed on github directly (this is a private repo) -this file is available on https://github.com/nallott/picosec-docs/blob/master/index.md 




## Ownership, licensing etc.

IP in any individual page in this wiki is owned by the original committer, unless stated otherwise.

Updated at 11:17 02/07/2014
