import edge from "edge.js";
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'

addCollection(heroIcons)

edge.use(edgeIconify)