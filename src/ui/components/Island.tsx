import clsx from "clsx";
import { useState } from "react";
import { type Square, Island } from "../../scrog/island";
import { paint } from "../../scrog/painter";
import type { Scrog } from "../../scrog/scrog";
import { type Sound, CHOMP, CROAK, OUCH, RUSTLE, SPLASH } from "../../scrog/sound";
import { type Thing, BERRY } from "../../scrog/thing";
import { type Tile, DEEP_WATER, GRASS, WATER } from "../../scrog/tile";
import { EAST, NORTH, SOUTH, WEST, Where } from "../../scrog/where";


function CellView({iz, cell, where, setWhere}: {iz: Island, cell: Square, where: Where, setWhere: (where: Where) => void}) {
  const tile  = cell.tileId  && Island.getTileWithId (iz, cell.tileId );
  const thing = cell.thingId && Island.getThingWithId(iz, cell.thingId);
  const scrog = cell.scrogId && Island.getScrogWithId(iz, cell.scrogId);
  const sound = cell.soundId && Island.getSoundWithId(iz, cell.soundId);

  function onClick() {
    setWhere(cell.where);
  }

  return (
    <div className={clsx("text-2xl relative w-20 h-20 tooltip",
      cell.where === where && "tooltip-open border-3 border-warning",
      cell.where !== where && "p-3"
    )} onClick={onClick}>
      {tile  && <TileView  tile ={tile } />}
      {thing && <ThingView thing={thing} />}
      {scrog && <ScrogView scrog={scrog} />}
      {sound && <SoundView sound={sound} />}
    </div>
  )
}

function TileView({tile}: {tile: Tile}) {
  return (
    <div className={clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full",
      tile.is === GRASS      && "bg-green-500",
      tile.is === WATER      && "bg-blue-400",
      tile.is === DEEP_WATER && "bg-blue-900",
    )} />
  )
}

function ThingView({thing}: {thing: Thing}) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit">
      { thing.is === BERRY && "🍓" }
    </div>
  )
}

function ScrogView({scrog}: {scrog: Scrog}) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit">
      {scrog.facing === NORTH && "⬆️"}
      {scrog.facing === EAST  && "➡️"}
      {scrog.facing === SOUTH && "⬇️"}
      {scrog.facing === WEST  && "⬅️"}
    </div>
  )
}

function SoundView({sound}: {sound: Sound}) {
  return (
    <div className="tooltip-content text-2xl">
      {sound.is === RUSTLE && "🍃"}
      {sound.is === SPLASH && "💧"}
      {sound.is === CROAK  && "❤️"}
      {sound.is === CHOMP  && "😋"}
      {sound.is === OUCH   && "💢"}
    </div>
  )
}

function Inspector({iz, where}: {iz: Island, where: Where}) {
  const tile  = Island.getTileAt (iz, where);
  const thing = Island.getThingAt(iz, where);
  const scrog = Island.getScrogAt(iz, where);
  const sound = Island.getSoundAt(iz, where);

  return <div className="flex flex-col">
    <h1>Inspector</h1>
    <span>{tile  && `tile : ${tile .is}`}</span>
    <span>{thing && `thing: ${thing.is}`}</span>
    <span>{sound && `sound: ${sound.is}`}</span>
  </div>
}

function IslandView({iz, where, setWhere}: {
  iz: Island, 
  where: Where,
  setWhere: (where: Where) => void
}) {  
  return (
    <div className="w-fit h-fit grid rounded-4xl overflow-hidden" style={{
      "gridTemplateColumns": `repeat(${iz.w}, 1fr)`
    }}>
      {iz.squares.map((cell, i) => (
        <CellView key={i} iz={iz} cell={cell} where={where} setWhere={setWhere} />
      ))}
    </div>
  )
}

export default function FullView() {

  const [iz, setIz] = useState<Island>(paint(Island.new()));

  const [where, setWhere] = useState<Where>(Where.new(0, 0));

  return (
    <div className="w-full flex">
      <IslandView iz={iz} where={where} setWhere={setWhere} />
      <Inspector iz={iz} where={where} />
    </div>
  )
}