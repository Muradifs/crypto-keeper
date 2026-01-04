"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RotateCcw, Trophy, Edit, Play, Save, Trash2, Share2 } from "lucide-react"

type Cell = "empty" | "wall" | "target" | "player" | "box" | "boxOnTarget" | "playerOnTarget" | "movableBlock"
type Grid = Cell[][]

const LEVELS: Grid[] = [
  // Level 1
  [
    ["wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "target", "empty", "wall"],
    ["wall", "player", "wall", "wall", "wall", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 2
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "wall"],
    ["wall", "empty", "box", "player", "box", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 3
  [
    ["wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "target", "wall"],
    ["wall", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 4
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "player", "box", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 5
  [
    ["wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "target", "wall"],
    ["wall", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 6
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 7
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 8
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "empty", "target", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "empty", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 9
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 10
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "empty", "target", "empty", "empty", "target", "empty", "wall"],
    ["wall", "empty", "empty", "box", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 11
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 12
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "box", "box", "empty", "empty", "wall"],
    ["wall", "empty", "player", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 13
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 14
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 15
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "empty", "target", "target", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 16
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 17
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 18
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "box", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 19
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 20
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "empty", "target", "empty", "empty", "target", "empty", "wall"],
    ["wall", "empty", "box", "empty", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 21
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "box", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 22
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 23
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "player", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 24
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "box", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 25
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "wall", "empty", "target", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 26
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "box", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 27
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 28
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 29
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "box", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 30
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 31
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "box", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 32
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "box", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 33
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "target", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 34
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 35
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "box", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 36
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 37
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 38
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "box", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 39
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 40
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 41
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 42
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "wall"],
    ["wall", "empty", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 43
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "player", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 44
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 45
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "box", "empty", "wall"],
    ["wall", "empty", "box", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 46
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "empty", "empty", "empty", "target", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 47
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 48
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 49
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "box", "box", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "player", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 50
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "target", "target", "target", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "empty", "box", "empty", "box", "empty", "box", "wall"],
    ["wall", "empty", "empty", "player", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
]

export default function CryptoKeeperGame() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [grid, setGrid] = useState<Cell[][]>([])
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 })
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)

  const [isEditorMode, setIsEditorMode] = useState(false)
  const [editorGrid, setEditorGrid] = useState<Cell[][]>([])
  const [selectedTool, setSelectedTool] = useState<Cell>("wall")
  const [customLevels, setCustomLevels] = useState<Cell[][][]>([])

  // Initialize level
  useEffect(() => {
    if (currentLevel < 50) {
      loadLevel(currentLevel)
    } else {
      const emptyGrid: Cell[][] = Array(10)
        .fill(null)
        .map(() => Array(13).fill("empty"))
      setEditorGrid(emptyGrid)
      setIsEditorMode(true)
    }
  }, [currentLevel])

  // Check win condition
  useEffect(() => {
    if (moves === 0) return

    const hasBoxNotOnTarget = grid.some((row) => row.some((cell) => cell === "box"))

    if (!hasBoxNotOnTarget) {
      setIsComplete(true)
    }
  }, [grid, moves])

  function loadLevel(levelIndex: number) {
    const levelData = LEVELS[levelIndex]
    const newGrid = levelData.map((row) => [...row])

    let foundPlayer = { row: 0, col: 0 }
    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[row].length; col++) {
        if (newGrid[row][col] === "player") {
          foundPlayer = { row, col }
        }
      }
    }

    setGrid(newGrid)
    setPlayerPos(foundPlayer)
    setMoves(0)
    setIsComplete(false)
  }

  function movePlayer(dRow: number, dCol: number) {
    if (isComplete) return

    const newRow = playerPos.row + dRow
    const newCol = playerPos.col + dCol

    if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
      return
    }

    const targetCell = grid[newRow][newCol]

    if (targetCell === "wall") return

    const newGrid = grid.map((row) => [...row])

    if (targetCell === "box" || targetCell === "boxOnTarget" || targetCell === "movableBlock") {
      const boxNewRow = newRow + dRow
      const boxNewCol = newCol + dCol

      if (boxNewRow < 0 || boxNewRow >= grid.length || boxNewCol < 0 || boxNewCol >= grid[0].length) {
        return
      }

      const boxTargetCell = grid[boxNewRow][boxNewCol]

      if (
        boxTargetCell === "wall" ||
        boxTargetCell === "box" ||
        boxTargetCell === "boxOnTarget" ||
        boxTargetCell === "movableBlock"
      ) {
        return
      }

      // Update old player position
      const oldPlayerCell = newGrid[playerPos.row][playerPos.col]
      newGrid[playerPos.row][playerPos.col] = oldPlayerCell === "playerOnTarget" ? "target" : "empty"

      if (targetCell === "movableBlock") {
        newGrid[newRow][newCol] = "empty"
        newGrid[boxNewRow][boxNewCol] = "movableBlock"
      } else {
        newGrid[newRow][newCol] = targetCell === "boxOnTarget" ? "target" : "empty"
        // Place box in new position
        newGrid[boxNewRow][boxNewCol] = boxTargetCell === "target" ? "boxOnTarget" : "box"
      }

      // Place player in new position
      const playerLandingCell = newGrid[newRow][newCol]
      newGrid[newRow][newCol] = playerLandingCell === "target" ? "playerOnTarget" : "player"

      setGrid(newGrid)
      setPlayerPos({ row: newRow, col: newCol })
      setMoves(moves + 1)
    } else {
      // Just move player
      const oldPlayerCell = newGrid[playerPos.row][playerPos.col]
      newGrid[playerPos.row][playerPos.col] = oldPlayerCell === "playerOnTarget" ? "target" : "empty"

      newGrid[newRow][newCol] = targetCell === "target" || targetCell === "playerOnTarget" ? "playerOnTarget" : "player"

      setGrid(newGrid)
      setPlayerPos({ row: newRow, col: newCol })
      setMoves(moves + 1)
    }
  }

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!touchStart) return

    const deltaX = e.changedTouches[0].clientX - touchStart.x
    const deltaY = e.changedTouches[0].clientY - touchStart.y

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > 30) {
        movePlayer(0, deltaX > 0 ? 1 : -1)
      }
    } else {
      if (Math.abs(deltaY) > 30) {
        movePlayer(deltaY > 0 ? 1 : -1, 0)
      }
    }

    setTouchStart(null)
  }

  // Keyboard controls
  useEffect(() => {
    if (isEditorMode) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault()
        movePlayer(-1, 0)
      } else if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault()
        movePlayer(1, 0)
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault()
        movePlayer(0, -1)
      } else if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault()
        movePlayer(0, 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [playerPos, grid, isComplete, isEditorMode, moves])

  function startEditor() {
    const emptyGrid: Cell[][] = Array(10)
      .fill(null)
      .map(() => Array(13).fill("empty"))
    setEditorGrid(emptyGrid)
    setIsEditorMode(true)
  }

  function handleEditorCellClick(row: number, col: number) {
    const newGrid = editorGrid.map((r) => [...r])

    if (selectedTool === "player") {
      // Remove old player
      for (let r = 0; r < newGrid.length; r++) {
        for (let c = 0; c < newGrid[r].length; c++) {
          if (newGrid[r][c] === "player") {
            newGrid[r][c] = "empty"
          }
        }
      }
      newGrid[row][col] = "player"
    } else {
      if (newGrid[row][col] !== "player") {
        newGrid[row][col] = selectedTool
      }
    }

    setEditorGrid(newGrid)
  }

  const saveCustomLevel = () => {
    let playerCount = 0
    let boxCount = 0
    let targetCount = 0

    for (const row of editorGrid) {
      for (const cell of row) {
        if (cell === "player") playerCount++
        if (cell === "box") boxCount++
        if (cell === "target") targetCount++
      }
    }

    if (playerCount !== 1) {
      alert("You must have exactly 1 Pi Boy!")
      return
    }

    if (boxCount === 0 || targetCount === 0 || boxCount !== targetCount) {
      alert(`Number of boxes (${boxCount}) must equal number of targets (${targetCount})!`)
      return
    }

    const newLevels = [...customLevels, editorGrid]
    setCustomLevels(newLevels)
    localStorage.setItem("picoban_custom_levels", JSON.stringify(newLevels))
    alert("Level saved! Share the code with a friend.")
    setIsEditorMode(false)
    setCurrentLevel(0)
  }

  function loadCustomLevel(levelIndex: number) {
    const levelData = customLevels[levelIndex]
    const newGrid = levelData.map((row) => [...row])

    let foundPlayer = { row: 0, col: 0 }
    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[row].length; col++) {
        if (newGrid[row][col] === "player") {
          foundPlayer = { row, col }
        }
      }
    }

    setGrid(newGrid)
    setPlayerPos(foundPlayer)
    setMoves(0)
    setIsComplete(false)
    setIsEditorMode(false)
  }

  // Load custom levels on mount
  useEffect(() => {
    const saved = localStorage.getItem("picoban_custom_levels")
    if (saved) {
      try {
        setCustomLevels(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load custom levels")
      }
    }
  }, [])

  if (isEditorMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <header className="bg-white dark:bg-gray-800 shadow-lg p-4">
          <div className="container mx-auto max-w-4xl flex items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Level Editor - Level 51</h1>
            <Button
              onClick={() => {
                setIsEditorMode(false)
                setCurrentLevel(0)
              }}
              variant="outline"
            >
              Back
            </Button>
          </div>
        </header>

        <main className="container mx-auto max-w-4xl p-4 space-y-4">
          <Card className="p-6 bg-white dark:bg-gray-800">
            <h3 className="font-bold mb-3">Create Challenge for Opponent</h3>
            <div className="flex gap-2 flex-wrap">
              <Button variant={selectedTool === "wall" ? "default" : "outline"} onClick={() => setSelectedTool("wall")}>
                Wall
              </Button>
              <Button
                variant={selectedTool === "empty" ? "default" : "outline"}
                onClick={() => setSelectedTool("empty")}
              >
                Empty
              </Button>
              <Button
                variant={selectedTool === "target" ? "default" : "outline"}
                onClick={() => setSelectedTool("target")}
              >
                Target 🎯
              </Button>
              <Button variant={selectedTool === "box" ? "default" : "outline"} onClick={() => setSelectedTool("box")}>
                Box 📦
              </Button>
              <Button
                variant={selectedTool === "movableBlock" ? "default" : "outline"}
                onClick={() => setSelectedTool("movableBlock")}
              >
                Block 🧱
              </Button>
              <Button
                variant={selectedTool === "player" ? "default" : "outline"}
                onClick={() => setSelectedTool("player")}
              >
                Pi Boy 🟡
              </Button>
            </div>
          </Card>

          <div className="bg-white dark:bg-gray-800 border-4 border-purple-500 rounded-lg p-4 shadow-xl">
            <div className="grid gap-1">
              {editorGrid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                  {row.map((cell, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleEditorCellClick(rowIndex, colIndex)}
                      className={`w-9 h-9 flex items-center justify-center rounded text-xl transition-all ${
                        cell === "wall"
                          ? "bg-gray-700"
                          : cell === "target"
                            ? "bg-yellow-200 ring-2 ring-yellow-500"
                            : cell === "player"
                              ? "bg-blue-200"
                              : cell === "box"
                                ? "bg-orange-300 border-2 border-orange-600"
                                : cell === "movableBlock"
                                  ? "bg-green-400 border-2 border-green-700"
                                  : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {cell === "wall" && "█"}
                      {cell === "target" && "🎯"}
                      {cell === "player" && "🤖"}
                      {cell === "box" && "📦"}
                      {cell === "movableBlock" && "🧱"}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Button onClick={saveCustomLevel} size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Save className="w-5 h-5 mr-2" />
            Save Challenge
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">Pi-coban</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pi Network Data Organizer</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Level {currentLevel + 1} / 50</div>
              <div className="text-2xl font-mono font-bold text-orange-500">{moves} moves</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 gap-6">
        {isComplete && (
          <Card className="p-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center shadow-xl">
            <Trophy className="w-16 h-16 mx-auto mb-3" />
            <h2 className="text-3xl font-bold mb-2">Level Complete!</h2>
            <p className="mb-4 text-lg">Completed in {moves} moves</p>
            {currentLevel < 49 ? (
              <Button onClick={() => setCurrentLevel(currentLevel + 1)} size="lg" variant="secondary">
                Next Level
              </Button>
            ) : (
              <div className="space-y-2">
                <Button onClick={() => setCurrentLevel(50)} size="lg" variant="secondary" className="w-full">
                  Level 51: Create Challenge
                </Button>
                <Button onClick={() => setCurrentLevel(0)} variant="outline" className="w-full">
                  Play From Start
                </Button>
              </div>
            )}
          </Card>
        )}

        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="bg-white dark:bg-gray-800 border-4 border-purple-500 rounded-lg p-4 shadow-xl touch-none select-none"
        >
          <div className="grid gap-1">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-12 h-12 flex items-center justify-center rounded text-2xl transition-all relative ${
                      cell === "wall"
                        ? "bg-gray-700"
                        : cell === "target" || cell === "boxOnTarget" || cell === "playerOnTarget"
                          ? "bg-yellow-200 ring-2 ring-yellow-500"
                          : cell === "box"
                            ? "bg-orange-300 border-2 border-orange-600"
                            : cell === "movableBlock"
                              ? "bg-green-400 border-2 border-green-700"
                              : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {cell === "wall" && "█"}
                    {(cell === "target" || cell === "playerOnTarget") && "🎯"}
                    {(cell === "box" || cell === "boxOnTarget") && "📦"}
                    {cell === "movableBlock" && "🧱"}
                    {(cell === "player" || cell === "playerOnTarget") && "🤖"}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Card className="p-4 max-w-md bg-white dark:bg-gray-800">
          <h3 className="font-bold mb-2 text-purple-600 dark:text-purple-400">How to Play</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Move Pi Boy (🤖) and push all data blocks (📦) onto target zones (🎯). Swipe or use keyboard.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Keys: arrows or WASD</p>
        </Card>

        {customLevels.length > 0 && (
          <Card className="p-4 max-w-md bg-white dark:bg-gray-800">
            <h3 className="font-bold mb-3 text-purple-600 dark:text-purple-400">Custom Challenges</h3>
            <div className="space-y-2">
              {customLevels.map((_, index) => (
                <div key={index} className="flex gap-2">
                  <Button onClick={() => loadCustomLevel(index)} variant="outline" className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Challenge {index + 1}
                  </Button>
                  <Button
                    onClick={() => {
                      const newLevels = customLevels.filter((_, i) => i !== index)
                      setCustomLevels(newLevels)
                      localStorage.setItem("picoban_custom_levels", JSON.stringify(newLevels))
                    }}
                    variant="destructive"
                    size="icon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      const levelString = JSON.stringify(customLevels[index])
                      navigator.clipboard.writeText(levelString)
                      alert("Level copied! Share with a friend.")
                    }}
                    variant="outline"
                    size="icon"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Button
          onClick={() => {
            setIsEditorMode(true)
            setCurrentLevel(50)
          }}
          size="lg"
          variant="outline"
          className="w-full"
        >
          <Edit className="w-5 h-5 mr-2" />
          Level 51: Create Your Challenge
        </Button>
      </main>

      <div className="bg-white dark:bg-gray-800 shadow-lg p-4">
        <div className="container mx-auto max-w-md flex gap-2">
          <Button
            onClick={() => loadLevel(currentLevel)}
            size="lg"
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
          {currentLevel < 49 && (
            <Button onClick={() => setCurrentLevel(currentLevel + 1)} size="lg" variant="outline">
              Skip
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
