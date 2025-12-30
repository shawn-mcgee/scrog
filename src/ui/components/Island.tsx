import { Island as Iz } from "../../scrog/island"
import { SPLASH, RUSTLE, CHOMP, CROAK, Sound as SoundType } from "../../scrog/sound"
import { BERRY, Thing as ThingType } from "../../scrog/thing"
import { Scrog as ScrogType } from "../../scrog/scrog"
import { GRASS, WATER, DEEP_WATER, Tile as TileType } from "../../scrog/tile"
import { RED, YELLOW, GREEN, CYAN, BLUE, MAGENTA, WHITE, BLACK, Color as ColorType } from "../../scrog/color"
import clsx from "clsx"
import { EAST, NORTH, SOUTH, WEST, Where } from "../../scrog/where"




function Tile({ iz, tile }: { iz: Iz, tile: TileType }) {
  return (
    <div className={clsx(
      "relative w-20 h-20",
      tile.is === GRASS      && "bg-green-500",
      tile.is === WATER      && "bg-blue-500",
      tile.is === DEEP_WATER && "bg-blue-700"
    )}>
      {tile.thingId && <Thing thing={Iz.getThingWithId(iz, tile.thingId)!}/>}
      {tile.scrogId && <Scrog scrog={Iz.getScrogWithId(iz, tile.scrogId)!}/>}
      {tile.soundId && <Sound sound={Iz.getSoundWithId(iz, tile.soundId)!}/>}
    </div>
  )
}

function Scrog({ scrog }: { scrog: ScrogType }) {
  return (
    <div className="absolute text-2xl w-fit h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {scrog.facing === NORTH && "⬆️"}
      {scrog.facing === EAST  && "➡️"}
      {scrog.facing === SOUTH && "⬇️"}
      {scrog.facing === WEST  && "⬅️"}
    </div>
  )
}

function Thing({ thing }: { thing: ThingType }) {
  return (
    <div className="absolute text-2xl w-fit h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {thing.is === BERRY && "🍓"}
    </div>
  )
}

function Sound({ sound }: { sound: SoundType }) {
  return (
    <div className="absolute text-2xl w-fit h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {sound.is === SPLASH && "💧"}
      {sound.is === RUSTLE && "🍃"}
      {sound.is === CHOMP  && "😋"}
      {sound.is === CROAK  && "❤️"}
    </div>
  )
}





export default function Island() {
  const iz = Iz.new();
  Iz.populate(iz);

  const scrog = ScrogType.Green(iz);
  Iz.putScrogAt(iz, scrog.id, Where.new(5, 5));

  return (
    <div className="grid grid-cols-10 w-fit h-fit rounded-lg overflow-hidden">
      {Object.values(iz.grid).map((id, i) => {
        return <Tile key={id} iz={iz} tile={Iz.getTileWithId(iz, id)!}/>
      })}
    </div>
  )
}