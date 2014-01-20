Fingerprint: Batch SHA1 Hash generation
======================================

Fingerprint is a CLI script used to generate a SHA1 Hash for files in your local filesystem. Fingerprint will produce a log file that contains the sha1hash and the path information for each file. This log can be used for additional analysis and location of duplicate files.

Installation
------------

*Clone the git repository.
*run NPM Install

Usage
-----

Currently Fingerprint.js supports two commandline arguments.

*The source path. This path identifies where Fingerprint will begin generation of the sha1 hashes. Fingerprint will generate a hash for all files in the direcrory. If a directory contians subdirectories, Fingerprint will look inside those as well. PWD is the default directory.

*The log name. Fingerprint will generate a .csv that contians the sha1hash and path information for each file. You only need to provide the name of the log, Fingerprint will provide the filename extension. log.csv is the default log.

example: node fingerprint.js /path/to/files/ fingerprintlog

